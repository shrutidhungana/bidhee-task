import { toast } from "react-toastify";

const useToast = () => {
  const success = (message: string) => {
    toast.success(message, {
      className: "bg-green-500 text-white p-2 rounded-md shadow-md",
      position: "top-right",
      autoClose: 3000,
    });
  };

  const error = (message: string) => {
    toast.error(message, {
      className: "bg-red-500 text-white p-2 rounded-md shadow-md",
      position: "top-right",
      autoClose: 3000,
    });
  };

  return { success, error };
};

export default useToast;
