import { CiDiscount1 } from "react-icons/ci";
import { BiBookmark } from "react-icons/bi";
import { FiArrowRight } from "react-icons/fi";
import { useAuth } from "../../Hooks/useAuth";
import "./CartPage.css";
import { useData } from "../../context/DataContext";
import { CartCard } from "./component/CartCard";
import { CartSideBar } from "./component/CartSideBar";
import { useNavigate } from "react-router-dom";
import { EmptyCart } from "./component/EmptyCart";
export const CartPage = () => {
  const { currUser } = useAuth();
  const navigate = useNavigate();
  const { data } = useData();
  return data.cart.length > 0 ? (
    <div className="cart-parent">
      <div className="heading-container">
        <h1>SHOPPING BAG</h1>
      </div>
      <div className="cart-page-container">
        <div className="cart-leftside">
          {/* <div className="address-container">
       <div className="address-detail">
         <div className="detail">
           <span>Deliver to: </span>
           <span className="user-name">Akash Kumar Singh</span>
           <span className="user-pincode">231217</span>
         </div>
         <div className="user-address">
           Qtr. H-393 Hindalco Colony Renukoot Sonebhadra
         </div>
       </div>
       <div className="address-change">
         <button>CHANGE</button>
       </div>
     </div> */}
          <div className="offers-section">
            <div className="offer-header">
              <span>
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
            {data.cart.map((ele) => (
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
