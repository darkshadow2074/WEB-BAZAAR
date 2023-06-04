import { useEffect, useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { PROMO_COUPON_IMAGE } from "../../../Utils/assetsImport/constant";
import "../Auth.css";
import { validateEmail } from "../../../Utils/validators/validatorFunctions";
import { useAuth } from "../../../Hooks/useAuth";

export const LoginPage = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({
    email_error: "",
    password_error: "",
  });
  const [showPassword, setShowPasword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const guestLoginCredentials = {
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
  };
  const { LoginHandler, token } = useAuth();

  const handleEmailInputChange = (e) => {
    setLoginDetails((prevData) => ({
      ...prevData,
      email: e.target.value,
    }));
    if (!validateEmail(e.target.value)) {
      setLoginError((prevData) => ({
        ...prevData,
        email_error: "Email should be valid",
      }));
    } else {
      setLoginError((prevData) => ({
        ...prevData,
        email_error: "",
      }));
    }
  };
  const handlePasswordInputChange = (e) => {
    setLoginDetails((prevData) => ({
      ...prevData,
      password: e.target.value,
    }));
  };
  const onShowPasswordHandler = () => {
    setShowPasword((prevData) => !prevData);
  };
  const onLoginSubmit = (e) => {
    e.preventDefault();
    let isAnyError = false;
    let newError = {};
    Object.keys(loginDetails).forEach((key) => {
      newError[key + "_error"] = "";
      if (loginDetails[key] === "") {
        console.log(loginDetails[key]);
        newError[key + "_error"] = `${key} field shouldn't be empty`;
        isAnyError = true;
      }
    });
    if (isAnyError) {
      setLoginError(newError);
    } else {
      LoginHandler(loginDetails);
      setLoginError({
        email_error: "",
        password_error: "",
      });
    }
  };
  const handleGuestLogin = () => {
    setLoginDetails({
      email: guestLoginCredentials.email,
      password: guestLoginCredentials.password,
    });
  };
  useEffect(() => {
    if (token && navigate) {
      navigate(location?.state?.from.pathname || "/");
    }
  }, [token, navigate, location]);
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="promo-image-container">
          <img src={PROMO_COUPON_IMAGE} alt="" />
        </div>
        <div className="login-form">
          <h1>Login</h1>
          <div className="input-container">
            <label>
              <p>Email</p>
              <input
                type="email"
                name="Email"
                id="email"
                placeholder="abc@webbazaar.com"
                value={loginDetails.email}
                onChange={handleEmailInputChange}
              />
              <div className="error-section">
                {loginError.email_error.length > 0 && (
                  <span>{loginError.email_error}</span>
                )}
              </div>
            </label>
            <label>
              <p>Password</p>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  id="password"
                  value={loginDetails.password}
                  placeholder="Enter Your Password"
                  onChange={handlePasswordInputChange}
                />
                <span className="btn-show-icon" onClick={onShowPasswordHandler}>
                  {showPassword ? <BiHide /> : <BiShow />}
                </span>
              </div>
              <div className="error-section">
                {loginError.password_error.length > 0 && (
                  <span>{loginError.password_error}</span>
                )}
              </div>
            </label>
            <button className="login" onClick={onLoginSubmit}>
              Login
            </button>
            <div className="signup-section">
              <p>
                Don't have an account ? <NavLink to="/signup">Signup</NavLink>{" "}
              </p>
            </div>
            <div className="login-section">
              <p>
                Login as Guest User ?{" "}
                <NavLink onClick={handleGuestLogin}>Guest</NavLink>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
