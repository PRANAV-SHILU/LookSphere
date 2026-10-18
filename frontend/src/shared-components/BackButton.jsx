import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ to, label = "Back" }) {
  const navigate = useNavigate();

  const className =
    "flex items-center cursor-pointer gap-2 text-sm font-semibold transition-all duration-200 hover:-translate-x-1 bg-transparent border-none no-underline";
  const style = { color: "var(--text-secondary)" };

  if (to) {
    return (
      <Link
        to={to}
        className={className}
        style={style}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--text-primary)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--text-secondary)")
        }
      >
        <ArrowLeft size={16} />
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={className}
      style={style}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}
