import { motion as Motion, AnimatePresence } from "framer-motion";
import { ConfirmationModal as ConfirmationModalAnimation } from "../utils/animation";

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "btn btn-danger",
  cancelButtonClass = "btn btn-secondary",
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          {...ConfirmationModalAnimation.backdropTransition}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-md"
        >
          <Motion.div
            {...ConfirmationModalAnimation.dialogTransition}
            className="w-[90%] max-w-[400px] bg-(--surface-card) p-8 rounded-2xl text-center shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
          >
            {title && <h3 style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>{title}</h3>}
            {message && (
              <p style={{ marginBottom: "2rem", color: "var(--text-muted)" }}>
                {message}
              </p>
            )}
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button className={cancelButtonClass} onClick={onCancel}>
                {cancelText}
              </button>
              <button className={confirmButtonClass} onClick={onConfirm}>
                {confirmText}
              </button>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
