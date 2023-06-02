import { useEffect, useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { PROMO_COUPON_IMAGE } from "../../../Utils/assetsImport/constant";
import "../Auth.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  validateOnlyString,
  validateEmail,
  validatePassword,
} from "../../../Utils/validators/validatorFunctions";
import { useAuth } from "../../../Hooks/useAuth";
export const SignupPage = () => {
  const { SignupHandler, token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [signupnClicked, setSignupnClicked] = useState(false);
  const [signupDetails, setSignupDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [signupError, setSignupError] = useState({
    first_name_error: "",
    last_name_error: "",
    email_error: "",
    password_error: "",
    confirm_password_error: "",
  });
  const [showPassword, setShowPasword] = useState({
    forNewPassWord: false,
    forConfirmPassword: false,
  });
  const onShowPasswordHandler = (target) => {
    if (target === "Password") {
      setShowPasword((prevData) => ({
        ...prevData,
        forNewPassWord: !prevData.forNewPassWord,
      }));
    } else if (target === "Confirm Password") {
      setShowPasword((prevData) => ({
        ...prevData,
        forConfirmPassword: !prevData.forConfirmPassword,
      }));
    }
  };
  const onSignupSubmit = (e) => {
    e.preventDefault();
    setSignupnClicked(true);
    let isAnyError = false;
    let newFormError = {};
    Object.keys(signupDetails).forEach((ele) => {
      newFormError[ele + "_error"] = "";
      if (signupDetails[ele] === "" && ele !== "confirm_password") {
        newFormError[ele + "_error"] = `${ele} shouldn't be empty`;
        isAnyError = true;
      }
      if (signupDetails.password !== signupDetails.confirm_password) {
        newFormError["confirm-password"] =
          "Password and confirm password didn't matched";
      }
      if (isAnyError) {
        setSignupError(newFormError);
      }
      SignupHandler(signupDetails);
      setSignupDetails({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    });
  };
  useEffect(() => {
    if (token && navigate) {
      navigate(location?.state?.from?.pathname || "/");
    }
  }, [token, location, navigate]);
  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="promo-image-container">
          <img src={PROMO_COUPON_IMAGE} alt="" />
        </div>
        <div className="signup-form">
          <h1>Signup</h1>
          <div className="input-container">
            <label for="first-name">
              <p>First Name</p>
              <input
                type="text"
                name="First-Name"
                id="first-name"
                placeholder="John"
                value={signupDetails.first_name}
                onChange={(e) => {
                  setSignupDetails((prevData) => ({
                    ...prevData,
                    first_name: e.target.value,
                  }));
                  if (!validateOnlyString(e.target.value)) {
                    setSignupError((prevData) => ({
                      ...prevData,
                      first_name_error: "First Name should be in strings",
                    }));
                  } else {
                    setSignupError((prevData) => ({
                      ...prevData,
                      first_name_error: "",
                    }));
                  }
                }}
              />
              <div className="error-section">
                {signupError.first_name_error.length > 0 && (
                  <span>{signupError.first_name_error}</span>
                )}
              </div>
            </label>
            <label for="last-name">
              <p>Last Name</p>
              <input
                type="text"
                name="Last-Name"
                id="last-name"
                placeholder="Doe"
                value={signupDetails.last_name}
                onChange={(e) => {
                  setSignupDetails((prevData) => ({
                    ...prevData,
                    last_name: e.target.value,
                  }));
                  if (!validateOnlyString(e.target.value)) {
                    setSignupError((prevData) => ({
                      ...prevData,
                      last_name_error: "Last Name should be in strings",
                    }));
                  } else {
                    setSignupError((prevData) => ({
                      ...prevData,
                      last_name_error: "",
                    }));
                  }
                }}
              />
              <div className="error-section">
                {signupError.last_name_error.length > 0 && (
                  <span>{signupError.last_name_error}</span>
                )}
              </div>
            </label>
            <label for="email">
              <p>Email</p>
              <input
                type="email"
                name="Email"
                id="email"
                placeholder="abc@webbazaar.com"
                value={signupDetails.email}
                onChange={(e) => {
                  setSignupDetails((prevData) => ({
                    ...prevData,
                    email: e.target.value,
                  }));
                  if (!validateEmail(e.target.value)) {
                    setSignupError((prevData) => ({
                      ...prevData,
                      email_error: "Email should be in correct format",
                    }));
                  } else {
                    setSignupError((prevData) => ({
                      ...prevData,
                      email_error: "",
                    }));
                  }
                }}
              />
              <div className="error-section">
                {(signupDetails.email.length > 0 || signupnClicked) &&
                  signupError.email_error.length > 0 && (
                    <span>{signupError.email_error}</span>
                  )}
              </div>
            </label>
            <label for="password">
              <p>Password</p>
              <input
                type={showPassword.forNewPassWord ? "text" : "password"}
                name="Password"
                id="password"
                placeholder="Enter Your Password"
                value={signupDetails.password}
                onChange={(e) => {
                  setSignupDetails((prevData) => ({
                    ...prevData,
                    password: e.target.value,
                  }));
                  if (!validatePassword(e.target.value)) {
                    setSignupError((prevData) => ({
                      ...prevData,
                      password_error:
                        "Password should have atleast 8 chars and should have one digit",
                    }));
                  } else {
                    setSignupError((prevData) => ({
                      ...prevData,
                      password_error: "",
                    }));
                  }
                }}
              />
              <span
                className="btn-show-icon"
                onClick={() => onShowPasswordHandler("Password")}
              >
                {showPassword.forNewPassWord ? <BiHide /> : <BiShow />}
              </span>
              <div className="error-section">
                {(signupDetails.password.length > 0 || signupnClicked) &&
                  signupError.password_error.length > 0 && (
                    <span>{signupError.password_error}</span>
                  )}
              </div>
            </label>
            <label for="confirm-password">
              <p>Confirm Password</p>
              <input
                type={showPassword.forConfirmPassword ? "text" : "password"}
                name="Confirm Password"
                id="confirm-password"
                placeholder="Enter Your Password Again"
                value={signupDetails.confirm_password}
                onChange={(e) => {
                  setSignupDetails((prevData) => ({
                    ...prevData,
                    confirm_password: e.target.value,
                  }));
                }}
              />
              <span
                className="btn-show-icon"
                onClick={() => onShowPasswordHandler("Confirm Password")}
              >
                {showPassword.forConfirmPassword ? <BiHide /> : <BiShow />}
              </span>
              <div className="error-section">
                {(signupDetails.confirm_password.length > 0 ||
                  signupnClicked) &&
                  signupError.confirm_password_error.length > 0 && (
                    <span>{signupError.password_error}</span>
                  )}
              </div>
            </label>
            <button className="signup" onClick={onSignupSubmit}>
              Signup
            </button>
            <div className="login-section">
              <p>
                Already have an account ? <NavLink to="/login">Sign-in</NavLink>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
