import { createContext, useState } from "react";
import { loginService, signupService } from "../Services/service";
import { TOAST_TYPES, Toast_Handler } from "../Utils/Toast/toastConstants";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const localStorageWebBazaarData = localStorage.getItem("loginData");
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(null);
  const SignupHandler = async ({ first_name, last_name, email, password }) => {
    console.log(first_name, last_name);
    try {
      const {
        data: { createdUser, encodedToken },
        status,
      } = await signupService({ email, password, first_name, last_name });
      if (status === 201) {
        localStorage.setItem(
          "loginData",
          JSON.stringify({
            currentUser: createdUser,
            encodedToken: encodedToken,
          })
        );
        setCurrUser(createdUser);
        setToken(encodedToken);
        Toast_Handler(TOAST_TYPES.Success, "Successfully logged in");
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const LoginHandler = async ({ email, password }) => {
    try {
      const {
        data: { foundUser, encodedToken },
        status,
      } = await loginService({ email, password });
      if (status === 200) {
        localStorage.setItem(
          "loginData",
          JSON.stringify({ currentUser: foundUser, encodedToken: encodedToken })
        );
        setCurrUser(foundUser);
        setToken(encodedToken);
        Toast_Handler(TOAST_TYPES.Success, "Successfully logged in");
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const LogoutHandler = () => {
    localStorage.removeItem("loginData");
    setCurrUser(null);
    setToken(null);
  };
  return (
    <AuthContext.Provider
      value={{
        currUser,
        token,
        LoginHandler,
        SignupHandler,
        LogoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
