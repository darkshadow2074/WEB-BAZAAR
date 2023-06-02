import { useData } from "../context/DataContext";
import { Header } from "./Header";
import { Loader } from "./Loader";
import { WebBazaarRoutes } from "./WebBazaarRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const WebBazaar = () => {
  const { isLoading } = useData();
  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        newestOnTop={false}
        closeOnClick
        theme="colored"
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <Header />
      <WebBazaarRoutes />
    </>
  );
};
