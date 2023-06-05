import { useNavigate } from "react-router-dom";
import { ORDER_SUCCESS } from "../../Utils/assetsImport/constant";
import { useData } from "../../context/DataContext";
import "./Order.css";
import { ConfettiComponent } from "./ConfettiComponent";
export const Orders = () => {
  const navigate = useNavigate();
  const {
    data: {
      orderAddress: {
        fullName,
        mobileNumber,
        pinCode,
        country,
        city,
        state,
        address,
      },
    },
  } = useData();
  const handleExplore = () => navigate("/product");
  return (
    <>
      <ConfettiComponent />
      <div className="order-placed-container">
        <div className="order-place-header">
          <img src={ORDER_SUCCESS} alt="order-success" />
          <h1>Order Confirmed</h1>
          <p>
            Your order is confirmed. You will receive an order confirmation
            email/SMS shortly with the expected delivery date for your items.
          </p>
        </div>
        <div className="order-place-body">
          <div className="order-place-center">
            <div className="order-address">
              <p className="small-heading">Delivering To: </p>
              <p className="name">
                <span className="reciver-name">{fullName}</span> |{" "}
                {mobileNumber}
              </p>
              <p className="address">
                <span>{address}</span> <span>{pinCode}</span>
              </p>
              <p className="address">
                {city} {state} {country}
              </p>
            </div>
            <img
              src="https://constant.myntassets.com/checkout/assets/img/delhiveryPerson_17-03-2021.png"
              alt="orderImage"
            />
          </div>

          <div className="order-pace-buttons">
            <button className="view">View Order </button>
            <button className="explore" onClick={handleExplore}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
