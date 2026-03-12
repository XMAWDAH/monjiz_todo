/* eslint-disable react-refresh/only-export-components */
import {createContext, useState, useRef} from "react";
import MySnackBar from "../components/MySnackBar.jsx";

export const ToastContext = createContext({});

export const ToastProvider = ({children}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const timerRef = useRef(null);

  function showHideToast(message, type = "success") {
    setOpen(true);
    setMessage(message);
    setSeverity(type);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{showHideToast}}>
      <MySnackBar open={open} message={message} severity={severity} />
      {children}
    </ToastContext.Provider>
  );
};
