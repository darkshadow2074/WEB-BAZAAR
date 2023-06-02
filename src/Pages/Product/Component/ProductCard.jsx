import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiFillStar } from "react-icons/ai";
import { BsBag } from "react-icons/bs";

import { useAuth } from "../../../Hooks/useAuth";
import {
  Add_To_Bag,
  Add_To_Wishlist,
  Remove_From_Wishlist,
} from "../../../Services/cart_wishlist_functionalities";
import { useData } from "../../../context/DataContext";

export const ProductCard = ({
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
  const [isWishlistClicked, setIsWishlistClicked] = useState(false);
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
    <div className="product-card">
      <div
        className="product-thumbnail"
        onClick={() => navigate(`/product/${_id}`)}
      >
        <img src={image} alt={title} />
      </div>
      <div className="details">
        <div
          className="product-name"
          onClick={() => navigate(`/product/${_id}`)}
        >
          <span>{title}</span>
        </div>
        <div
          className="product-price"
          onClick={() => navigate(`/product/${_id}`)}
        >
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
        <div
          className="product-rating"
          onClick={() => navigate(`/product/${_id}`)}
        >
          <span>
            <AiFillStar /> {rating} |
            {reviews >= 1000 ? `${reviews / 1000}K` : reviews}
          </span>
        </div>
        <div
          className="wishlist-icon"
          onClick={() => setIsWishlistClicked((data) => !data)}
        >
          {isWishlistClicked ? (
            <span
              onClick={() =>
                Remove_From_Wishlist(
                  { productId: item._id, encodedToken: token },
                  navigate,
                  dispatch
                )
              }
            >
              <AiFillHeart />
            </span>
          ) : (
            <span
              onClick={() =>
                Add_To_Wishlist(
                  { product: item, encodedToken: token },
                  navigate,
                  data,
                  dispatch
                )
              }
            >
              <AiOutlineHeart />
            </span>
          )}
        </div>
        <div className="add-to-cart">
          <button
            onClick={() =>
              Add_To_Bag(
                { product: item, encodedToken: token },
                navigate,
                data,
                dispatch
              )
            }
          >
            <BsBag /> ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
};
