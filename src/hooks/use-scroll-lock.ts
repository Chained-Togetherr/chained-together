import { useEffect, useRef } from "react";

/**
 * Hook untuk mengunci scroll halaman saat modal terbuka,
 * dan mengembalikan posisi scroll yang tepat saat modal ditutup.
 */
export function useScrollLock(isLocked: boolean) {
  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    if (isLocked) {
      // Simpan posisi scroll saat ini sebelum dikunci
      scrollYRef.current = window.scrollY;

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      // Kembalikan posisi scroll yang tersimpan
      const savedScrollY = scrollYRef.current;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      document.body.style.paddingRight = "";

      // Gunakan requestAnimationFrame agar DOM sudah ter-reset sebelum scroll
      requestAnimationFrame(() => {
        window.scrollTo({ top: savedScrollY, behavior: "instant" });
      });
    }

    return () => {
      // Cleanup: pastikan body style bersih jika komponen unmount saat modal masih terbuka
      if (isLocked) {
        const savedScrollY = scrollYRef.current;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflowY = "";
        document.body.style.paddingRight = "";
        requestAnimationFrame(() => {
          window.scrollTo({ top: savedScrollY, behavior: "instant" });
        });
      }
    };
  }, [isLocked]);
}