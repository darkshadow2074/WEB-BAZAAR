import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { FaRegUser, FaBars } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { ACTION_TYPE } from "../Utils/reducerActions/action";
import { useData } from "../context/DataContext";
import { useAuth } from "../Hooks/useAuth";

export const Header = () => {
  const [hamBurgerClick, setHamBurgerClick] = useState(false);
  const { currUser, token, LogoutHandler } = useAuth();
  const { data, dispatch } = useData();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    dispatch({ type: ACTION_TYPE.SEARCH, payload: e.target.value });
  };
  const navigatetoProductPage = (categoryName) => {
    dispatch({ type: ACTION_TYPE.CLEAR_FILTER });
    dispatch({ type: ACTION_TYPE.ADD_CATEGORY, payload: categoryName });
  };
  const searchItemHandler = (e) => {
    if (e.keyCode === 13) {
      navigate("/product");
    }
  };
  const { wishList, cart } = data;
  const handleShowSideBar = () => setHamBurgerClick((data) => !data);
  return (
    <div className="navbar-container">
      <div className="sidebar">
        <FaBars onClick={handleShowSideBar} />
      </div>

      <div className="logo-container">
        {/* <img src={LOGO} alt="webBazaar-logo" className="img" /> */}
        <NavLink className="logo" to="/">
          <p> WEB BAZAAR</p>
        </NavLink>
      </div>

      {/* nav-category */}
      <div className="nav-link-container">
        <div
          className={hamBurgerClick ? "nav-category-sidebar" : "nav-category"}
        >
          <div className="signup-content">
            <div className="cancel-sidebar">
              <div className="cancel">
                <MdOutlineCancel onClick={handleShowSideBar} />
              </div>
            </div>
            <div className="content">
              <NavLink to="/signup">Signup</NavLink> |{" "}
              <NavLink to="/login">Login</NavLink>
            </div>
          </div>
          <NavLink
            to="/product"
            onClick={() => navigatetoProductPage("Men's Fashion")}
          >
            MEN
          </NavLink>
          <NavLink
            to="/product"
            onClick={() => navigatetoProductPage("Women's Fashion")}
          >
            WOMEN
          </NavLink>
          <NavLink
            to="/product"
            onClick={() => navigatetoProductPage("Kids' Fashion")}
          >
            KIDS
          </NavLink>
          <NavLink
            to="/product"
            onClick={() => navigatetoProductPage("Beauty")}
          >
            BEAUTY
          </NavLink>
        </div>

        <div className="searchbar ">
          <AiOutlineSearch onClick={searchItemHandler} className="searchIcon" />
          <input
            type="text"
            name="search"
            placeholder="Search For Products"
            id="search"
            className="search"
            onChange={handleInputChange}
            onKeyDown={searchItemHandler}
          />
        </div>
        <div className="profileContainer">
          <div className="user">
            <span>
              <FaRegUser />
            </span>
            <p>Profile</p>
            <div className="profile-action-drop-down">
              <div className="dropdown-header">
                <h2>Welcome </h2>
                {!token && <p>To access account and manage orders</p>}
                {token ? (
                  <p className="user-data">{currUser.email}</p>
                ) : (
                  <button onClick={() => navigate("/login")}>
                    LOGIN / SIGNUP
                  </button>
                )}
              </div>
              <div className="profile-active-bar"></div>
              <div className="dropdown-body">
                <NavLink to="/wishlist">Wishlist</NavLink>
                <NavLink to="/cart">Bag</NavLink>
                <NavLink to="/">Contact Us</NavLink>
              </div>
              {token && (
                <div className="dropdown-footer">
                  <NavLink to="/profile">Edit Profile</NavLink>
                  <NavLink to="/profile">Manage Addresses</NavLink>
                  {token && (
                    <NavLink onClick={() => LogoutHandler()}>Logout</NavLink>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="wishlisht-icon" onClick={() => navigate("/wishlist")}>
            <span>
              <AiOutlineHeart />
              {token && (
                <span className="wishlist-count">{wishList.length}</span>
              )}
            </span>
            <p>Wishlist</p>
          </div>
          <div className="cart-icon" onClick={() => navigate("/cart")}>
            <span>
              <BsBag />
              {token && <span className="cart-count">{cart.length}</span>}
            </span>
            <p>Bag</p>
          </div>
        </div>
      </div>
    </div>
  );
};
