import { toast } from "react-toastify";

const toastSuccess = (message: string, onClose?: () => {}) =>
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    onClose,
    toastId: message,
  });

const toastError = (message: string, onClose?: () => void) =>
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    onClose,
    toastId: message,
  });

export { toastSuccess, toastError };
