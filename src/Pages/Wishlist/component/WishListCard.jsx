import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { HiOutlineXMark } from "react-icons/hi2";
import {
  Add_To_Bag,
  Remove_From_Wishlist,
} from "../../../Services/cart_wishlist_functionalities";
import { useData } from "../../../context/DataContext";
import { useAuth } from "../../../Hooks/useAuth";
export const WishListCard = ({
  _id,
  title,
  description,
  price,
  original_price,
  rating,
  size,
  image,
  reviews,
  in_stock,
  delivery_time,
}) => {
  const item = {
    _id,
    title,
    description,
    price,
    original_price,
    rating,
    size,
    image,
    reviews,
    in_stock,
    delivery_time,
  };
  const navigate = useNavigate();
  const { data, dispatch } = useData();
  const { token } = useAuth();
  return (
    <div className="wishlist-card">
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
        <div className="cancel-icon">
          <span
            onClick={() =>
              Remove_From_Wishlist(
                { productId: item._id, encodedToken: token },
                navigate,
                dispatch
              )
            }
          >
            <HiOutlineXMark />
          </span>
        </div>
        <div className="add-to-cart">
          <button
            onClick={() => {
              Add_To_Bag(
                { product: item, encodedToken: token },
                navigate,
                data,
                dispatch
              );
              Remove_From_Wishlist(
                { productId: item._id, encodedToken: token },
                navigate,
                dispatch
              );
            }}
          >
            <BsBag /> MOVE TO BAG
          </button>
        </div>
      </div>
    </div>
  );
};
