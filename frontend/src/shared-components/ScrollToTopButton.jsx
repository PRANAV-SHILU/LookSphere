import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton({ threshold = 800 }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showScrollTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className="opacity-50 hover:opacity-100 transition-opacity justify-center flex items-center cursor-pointer"
      style={{
        position: "fixed",
        bottom: "2.5rem",
        right: "2.5rem",
        zIndex: 100,
        backgroundColor: "var(--primary-500)",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "3rem",
        height: "3rem",
        boxShadow: "var(--shadow-card)",
      }}
      title="Scroll to Top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
