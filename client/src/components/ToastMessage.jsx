import { useEffect } from "react";

const ToastMessage = ({ show, message, type = "success", onClose }) => {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      <div className={`toast show border-0 text-bg-${type}`} role="alert" aria-live="assertive">
        <div className="d-flex">
          <div className="toast-body d-flex align-items-center gap-2">
            <i className={`bi ${type === "success" ? "bi-check-circle-fill" : "bi-exclamation-circle-fill"}`}></i>
            {message}
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose} aria-label="Close"></button>
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;
