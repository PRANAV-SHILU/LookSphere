import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center cursor-pointer gap-2 text-sm font-medium transition-all duration-300 hover:-translate-x-1 hover:opacity-70 bg-transparent border-none"
      style={{ color: "var(--text-muted)" }}
    >
      <ArrowLeft size={16} />
      Back
    </button>
  );
}
