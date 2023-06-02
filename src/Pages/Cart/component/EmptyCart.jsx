import { useNavigate } from "react-router-dom";
import { EMPTY_CART_IMAGE } from "../../../Utils/assetsImport/constant";
import "./EmptyCart.css";
export const EmptyCart = ({ place }) => {
  const navigate = useNavigate();
  return (
    <div className="empty-cart-container">
      <img src={EMPTY_CART_IMAGE} alt="empty-cart" />
      <div className="bottom-section">
        <p className="primary-text">Hey, It feels so light!!</p>
        <p className="light-text">
          There is nothing in your {place}. Let's add some items.
        </p>
        <button onClick={() => navigate("/product")}>
          Explore All Products
        </button>
      </div>
    </div>
  );
};
