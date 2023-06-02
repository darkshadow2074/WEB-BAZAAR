import { useNavigate } from "react-router-dom";

import { AiOutlineHeart, AiFillStar } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import { useData } from "../../../context/DataContext";
import { useAuth } from "../../../Hooks/useAuth";
import {
  Add_To_Bag,
  Add_To_Wishlist,
} from "../../../Services/cart_wishlist_functionalities";

export const ProductDetailCard = ({
  _id,
  title,
  description,
  price,
  original_price,
  rating,
  size,
  image,
  category,
  trending,
  reviews,
  in_stock,
  delivery_time,
}) => {
  const { data, dispatch } = useData();
  const navigate = useNavigate();
  const item = {
    _id,
    title,
    description,
    price,
    original_price,
    rating,
    size,
    image,
    category,
    trending,
    reviews,
    in_stock,
    delivery_time,
  };
  const { token } = useAuth();
  return (
    <div className="product-details-card">
      <div className="product-img-container">
        <img src={image} alt={title} />
        <div className="product-rating">
          <span>
            <AiFillStar /> {rating} |
            {reviews >= 1000 ? `${reviews / 1000}K` : reviews}
          </span>
        </div>
      </div>
      <div className="product-card-details">
        <h1 className="product-title">{title}</h1>
        <p className="product-description">{description}</p>
        <div className="product-price">
          <div className="price">
            <p>Rs.{price}</p>
            <p className="original-price">Rs.{original_price}</p>
          </div>
          <div className="discount">
            <p>
              ({Math.floor(((original_price - price) / original_price) * 100)}%
              OFF)
            </p>
          </div>
        </div>
        <div className="size-section">
          <h2>Size - </h2>
          <span className={size.includes("ml" || "gm") ? "quantity" : " size"}>
            {size}
          </span>
        </div>
        <div className="delivery-estimate-section">
          <h2>Delivery In - </h2>
          <span>{delivery_time}</span>
        </div>
        <div className="availability-section">
          <h2>Availability - </h2>
          <span>{in_stock ? `In Stock` : `Out Of Stock`}</span>
        </div>
        <div>
          <br />
          <br />
        </div>
        <div className="btn-section">
          <button
            className="wishlist-btn"
            onClick={() =>
              Add_To_Wishlist(
                { product: item, encodedToken: token },
                navigate,
                data,
                dispatch
              )
            }
          >
            <AiOutlineHeart /> Wishlist
          </button>
          <button
            className="cart-btn"
            onClick={() =>
              Add_To_Bag(
                { product: item, encodedToken: token },
                navigate,
                data,
                dispatch
              )
            }
          >
            <FaShoppingBag /> Add To Bag
          </button>
        </div>
      </div>
    </div>
  );
};
