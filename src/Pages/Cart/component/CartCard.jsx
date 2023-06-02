import "./CartCard.css";
import { TbTruckDelivery } from "react-icons/tb";
import { HiOutlineXMark } from "react-icons/hi2";
import { useData } from "../../../context/DataContext";
import { useAuth } from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Increment_Decrement_Handler,
  Remove_From_Bag,
} from "../../../Services/cart_wishlist_functionalities";
export const CartCard = ({
  category,
  createdAt,
  delivery_time,
  description,
  image,
  in_stock,
  original_price,
  price,
  qty,
  rating,
  reviews,
  size,
  title,
  trending,
  updatedAt,
  _id,
}) => {
  const navigate = useNavigate();
  const { data, dispatch } = useData();
  const { token } = useAuth();
  return (
    <div className="cart-card">
      <img src={image} alt="title" />
      <div className="cart-item-details">
        <span className="cart-title">{title}</span>
        <span className="cart-description">{description}</span>
        <p className="cart-size">
          <span>Size - </span>
          {size}
        </p>
        <div className="cart-quantity">
          <span className="">Qty : </span>
          <div className="btn-group">
            <button
              onClick={() =>
                Increment_Decrement_Handler(
                  { productId: _id, encodedToken: token },
                  "increment",
                  data,
                  navigate,
                  dispatch
                )
              }
            >
              +
            </button>
            <span>{qty}</span>
            <button
              onClick={() =>
                Increment_Decrement_Handler(
                  { productId: _id, encodedToken: token },
                  "decrement",
                  data,
                  navigate,
                  dispatch
                )
              }
            >
              -
            </button>
          </div>
        </div>
        <div className="cart-price-container">
          <div className="cart-price">
            <span className="cart-item-price">₹{price}</span>
            <span className="cart-original-price">₹{original_price}</span>
          </div>

          <span className="cart-price-discount">
            ({Math.floor(((original_price - price) / original_price) * 100)}%
            OFF)
          </span>
        </div>
        <div className="cart-item-delivery-time">
          <div>
            <span className="truck-icon">
              <TbTruckDelivery />
            </span>{" "}
            Delivery in {delivery_time}
          </div>
        </div>
        <span
          className="remove-icon"
          onClick={() =>
            Remove_From_Bag(
              { productId: _id, encodedToken: token },
              navigate,
              dispatch
            )
          }
        >
          <HiOutlineXMark />
        </span>
      </div>
    </div>
  );
};
