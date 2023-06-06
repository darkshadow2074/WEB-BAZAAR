import { NavLink, useNavigate } from "react-router-dom";
import { FaTwitterSquare, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiHashnode } from "react-icons/si";

import "./HomePage.css";
import {
  MAIN_BANNER,
  KIDS_CARD_CATEGORY,
  MOBILE_BANNER,
} from "../../Utils/assetsImport/constant";
import { ACTION_TYPE } from "../../Utils/reducerActions/action";
import { useData } from "../../context/DataContext";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const [timer, setTimer] = useState({
    hours: 12,
    minutes: 0,
    seconds: 0,
  });
  const navigate = useNavigate();
  const { dispatch } = useData();
  useEffect(() => {
    const interval = setTimeout(() => {
      if (timer.seconds > 0) {
        setTimer((prevTime) => ({
          ...prevTime,
          seconds: prevTime.seconds - 1,
        }));
      } else {
        if (timer.minutes > 0) {
          setTimer((prevTime) => ({
            ...prevTime,
            minutes: prevTime.minutes - 1,
            seconds: 59,
          }));
        } else {
          if (timer.hours > 0) {
            setTimer((prevTime) => ({
              ...prevTime,
              hours: prevTime.hours - 1,
              minutes: 59,
              seconds: 59,
            }));
          } else {
            clearInterval(interval);
          }
        }
      }
    }, 1000);
  }, [timer.hours, timer.minutes, timer.seconds]);
  const navigatetoProductPage = (categoryName) => {
    dispatch({ type: ACTION_TYPE.CLEAR_FILTER });
    dispatch({ type: ACTION_TYPE.ADD_CATEGORY, payload: categoryName });
  };
  return (
    <div className="homepage-container">
      <div className="sale-indicator">
        <h2>
          Sale Starts In{" "}
          <span>{timer.hours < 10 ? `0${timer.hours}` : timer.hours}</span> H :{" "}
          <span>
            {timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}
          </span>{" "}
          M :{" "}
          <span>
            {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
          </span>{" "}
          S
        </h2>
      </div>
      <div className="banner-container" onClick={() => navigate("/product")}>
        <img className="mobileBanner" src={MOBILE_BANNER} alt="mobile-banner" />
        <img className="mainBanner" src={MAIN_BANNER} alt="Main-Banner" />
      </div>
      <div className="category-section">
        <div className="category-header-image-container">
          <img
            src="https://res.cloudinary.com/donqbxlnc/image/upload/v1648895557/fashify/0b21bba9-e1e2-4dd9-ac99-4a759abe68801648705771876-Shop-By-Category_w2adx7.webp"
            alt="category-header"
          />
        </div>
        <div className="card-container">
          <div className="mens-card">
            <img
              src="https://res.cloudinary.com/donqbxlnc/image/upload/v1648896074/fashify/e3220043-d4db-4c8a-9a5e-80459db0aae31648190230381-Roadster-_HL_fan7lo.webp"
              alt="jack & Jone's promo"
            />
            <div className="card-layers">
              <h3>MENS SECTION</h3>
              <p>
                Elevate your wardrobe with our premium range of men's clothing,
                crafted with a conscious focus on quality, comfort, and ethical
                production practices.
              </p>
              <NavLink
                to="/product"
                onClick={() => navigatetoProductPage("Men's Fashion")}
              >
                Shop Now
              </NavLink>
            </div>
          </div>
          <div className="womens-card">
            <img
              src="https://res.cloudinary.com/donqbxlnc/image/upload/v1648896554/fashify/4f54b81d-51ca-4526-bab3-04066d977f5a1648368745195-Levis_keqmez.webp"
              alt="jack & Jone's promo"
            />
            <div className="card-layers">
              <h3>WOMENS SECTION</h3>
              <p>
                Indulge in fashion-forward trends and timeless classics, as our
                collection of women's clothing offers a perfect balance of
                sophistication and individuality.
              </p>
              <NavLink
                to="/product"
                onClick={() => navigatetoProductPage("Women's Fashion")}
              >
                Shop Now
              </NavLink>
            </div>
          </div>
          <div className="kids-card">
            <img src={KIDS_CARD_CATEGORY} alt="jack & Jone's promo" />
            <div className="card-layers">
              <h3>KIDS SECTION</h3>
              <p>
                From adorable outfits to trendy essentials, our kid's clothing
                collection combines style and durability, ensuring your child
                stays fashion-forward while embracing their active lifestyle.
              </p>
              <NavLink
                to="/product"
                onClick={() => navigatetoProductPage("Kids' Fashion")}
              >
                Shop Now
              </NavLink>
            </div>
          </div>
          <div className="beauty-card">
            <img
              src="https://img.lovepik.com/free-template/01/28/38/632888piC7Hk.jpg_master.jpg!detail808"
              alt="jack & Jone's promo"
            />
            <div className="card-layers">
              <h3>BEAUTY SECTION</h3>
              <p>
                Discover our exquisite collection of beauty cosmetics, designed
                to enhance your natural radiance and elevate your beauty
                routine. Indulge in a world of luxurious skincare products,
                glamorous makeup essentials, and pampering beauty treatments.{" "}
              </p>
              <NavLink
                to="/product"
                onClick={() => navigatetoProductPage("Beauty")}
              >
                Shop Now
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="social-icons">
          <NavLink to="https://www.linkedin.com/in/akash-kumar-singh-48a624157/">
            <FaLinkedin />
          </NavLink>
          <NavLink to="https://twitter.com/AkashKu80823217">
            <FaTwitterSquare />
          </NavLink>
          <NavLink to="https://github.com/darkshadow2074">
            <FaGithub />
          </NavLink>
          <NavLink to="https://darkshadow.hashnode.dev/">
            <SiHashnode />
          </NavLink>
        </div>
        <p>
          Copyright © Akash. Made with <span>♡</span>
        </p>
      </div>
    </div>
  );
};
