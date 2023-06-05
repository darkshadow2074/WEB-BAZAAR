import { CiDiscount1 } from "react-icons/ci";
import { BiBookmark } from "react-icons/bi";
import { FiArrowRight } from "react-icons/fi";
import "./CartPage.css";
import { useData } from "../../context/DataContext";
import { CartCard } from "./component/CartCard";
import { CartSideBar } from "./component/CartSideBar";
import { useNavigate } from "react-router-dom";
import { EmptyCart } from "./component/EmptyCart";
import { useState } from "react";
import { ChangeAddress } from "./component/ChangeAddress";
export const CartPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const {
    data: {
      cart,
      orderAddress: { fullName, pinCode, city, address },
    },
  } = useData();

  const handleChangeAddress = () => setShowModal((prevChoice) => !prevChoice);
  return cart.length > 0 ? (
    <div className="cart-parent">
      <div className="heading-container">
        <h1>SHOPPING BAG</h1>
      </div>
      <div className="cart-page-container">
        <div className="cart-leftside">
          <div className="address-container">
            <div className="address-detail">
              <div className="detail">
                <p className="user-name">{fullName}</p>
                <p className="user-pincode">{pinCode}</p>
              </div>
              <div className="user-address">
                {address} {city}
              </div>
            </div>
            <div className="address-change">
              <button onClick={handleChangeAddress}>CHANGE</button>
            </div>
            {showModal && (
              <ChangeAddress handleChangeAddress={handleChangeAddress} />
            )}
          </div>
          <div className="offers-section">
            <div className="offer-header">
              <span className="icon">
                <CiDiscount1 />
              </span>{" "}
              <span>Available Offers</span>
            </div>
            <div className="offer-body">
              10% Instant Discount on Kotak Credit and Debit Cards on a min
              spend of Rs 4,000.TCA
            </div>
          </div>
          <div className="cart-item-container">
            {cart.map((ele) => (
              <CartCard key={ele._id} {...ele} />
            ))}
          </div>
          <div className="goto-wishlist-option">
            <div className="left">
              <BiBookmark />
              <span>Add More From Wishlist</span>
            </div>
            <div className="right" onClick={() => navigate("/wishlist")}>
              <FiArrowRight />
            </div>
          </div>
        </div>
        <div className="cart-right-side">
          <CartSideBar />
        </div>
      </div>
    </div>
  ) : (
    <EmptyCart place={"bag"} />
  );
};
