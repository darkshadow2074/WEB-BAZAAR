import { createContext, useState } from "react";
import { loginService, signupService } from "../Services/service";
import { TOAST_TYPES, Toast_Handler } from "../Utils/Toast/toastConstants";
import { useData } from "./DataContext";
import { ACTION_TYPE } from "../Utils/reducerActions/action";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);
  const { dispatch } = useData();
  const [token, setToken] = useState(null);
  const SignupHandler = async ({ first_name, last_name, email, password }) => {
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
        dispatch({
          type: ACTION_TYPE.LOAD_CART_WISHLIST,
          payload: {
            cart: [...createdUser.cart],
            wishlist: [...createdUser.wishlist],
          },
        });
        Toast_Handler(TOAST_TYPES.Success, "Successfully logged in");
      }
    } catch (err) {
      console.error(err.response.data);
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
        dispatch({
          type: ACTION_TYPE.LOAD_CART_WISHLIST,
          payload: {
            cart: [...foundUser.cart],
            wishlist: [...foundUser.wishlist],
          },
        });
        Toast_Handler(TOAST_TYPES.Success, "Successfully logged in");
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };
  const LogoutHandler = () => {
    localStorage.removeItem("loginData");
    setCurrUser(null);
    setToken(null);
    dispatch({ type: ACTION_TYPE.REMOVE_CART_WISHLIST });
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
