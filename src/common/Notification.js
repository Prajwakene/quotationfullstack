// sucess and error
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const showSucessToast = (message) => {
  toast.success(message, { position: "top-right" });
};

export const showErrorToast = (message) => {
  toast.error(message, { position: "top-right" });
};
