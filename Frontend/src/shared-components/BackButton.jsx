import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Motion.button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-sm font-medium"
      style={{ color: "var(--text-muted)" }}
      whileHover={{ x: -3, opacity: 0.7 }}
      transition={{ duration: 0.2 }}
    >
      <ArrowLeft size={16} />
      Back
    </Motion.button>
  );
}
