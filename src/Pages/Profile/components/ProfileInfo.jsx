import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";
import "./ProfileInfo.css";
export const ProfileInfo = () => {
  const { currUser, LogoutHandler } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="profile-info-container">
      <div className="blank-box"></div>
      <div className="profile-info">
        <img
          src="https://constant.myntassets.com/mymyntra/assets/img/default-image.png"
          alt="profile_image"
        />
        <div className="user-details">
          <h2>{currUser.name}</h2>
          <h2> {currUser.email}</h2>
        </div>
        <button
          onClick={() => {
            LogoutHandler();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
