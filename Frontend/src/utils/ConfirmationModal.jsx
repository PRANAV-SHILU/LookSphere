import { motion as Motion, AnimatePresence } from "framer-motion";

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <Motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{
              background: "var(--surface-card)",
              padding: "2rem",
              borderRadius: "var(--radius-lg)",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
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
