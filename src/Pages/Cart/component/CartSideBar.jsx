import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  get_total_discount_price,
  get_total_original_price,
  get_total_price,
} from "../../../Utils/priceCalculator/priceCalculation";
import { useData } from "../../../context/DataContext";
import { ACTION_TYPE } from "../../../Utils/reducerActions/action";
import "./CartSideBar.css";
import { useAuth } from "../../../Hooks/useAuth";
import { Remove_From_Bag } from "../../../Services/cart_wishlist_functionalities";

export const CartSideBar = () => {
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();

  const { data, dispatch } = useData();
  const { token } = useAuth();
  const total_original_price = get_total_original_price(data);
  let total_actual_price = get_total_price(data);
  const total_discounted_price = get_total_discount_price(
    total_original_price,
    total_actual_price
  );
  const handle_coupon_handler = (action) => {
    setCouponApplied((data) => !data);
  };
  const handle_order_placed = () => {
    dispatch({ type: ACTION_TYPE.ADD_ORDER, payload: data.cart });
    data.cart.forEach((ele) =>
      Remove_From_Bag(
        { productId: ele._id, encodedToken: token },
        navigate,
        dispatch,
        true
      )
    );
    navigate("/orders");
  };
  return (
    <div className="cart-page-sidebar">
      <h2>COUPONS</h2>
      <div className="apply-coupons">
        <div className="coupon-name">Flat ₹500 OFF</div>
        {couponApplied ? (
          <div
            className="selected-coupon"
            onClick={() => handle_coupon_handler("remove")}
          >
            REMOVE
          </div>
        ) : (
          <div
            className="btn-block"
            onClick={() => handle_coupon_handler("apply")}
          >
            APPLY
          </div>
        )}
      </div>
      <div className="cart-total-price-section">
        <p>PRICE DETAILS ({data.cart.length})</p>
        <div className="total-price-section">
          <div className="total-price">
            <div>
              <p>Total MRP</p> <span>₹{total_original_price}</span>
            </div>
            <div>
              <p>Discount MRP</p> <span>-₹{total_discounted_price}</span>
            </div>
            <div>
              <p>Convenience Fee</p> <span>+5</span>
            </div>
          </div>
          <div className="total-amount">
            <p>Total Amount</p>
            <p>
              ₹
              {couponApplied
                ? total_actual_price + 5 - 500
                : total_actual_price + 5}
            </p>
          </div>
          <div className="authenticity-section">
            <img
              src="https://assets.myntassets.com/dpr_2,q_60,c_limit,fl_progressive/assets/images/retaillabs/2020/6/24/11940eed-9b55-4171-9e59-dfb273b3f5961592993834502-1--1-.png"
              alt="genuine-section"
            />
          </div>
          <div className="place-order-btn-section">
            <div className="btn-section-header">
              Placing Order For {data.cart.length} Items
            </div>
            <div className="btn-container">
              <button onClick={handle_order_placed}>PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
