import { FaTimes } from "react-icons/fa";

import { useData } from "../../../context/DataContext";
import "./ChangeAddress.css";
import { ACTION_TYPE } from "../../../Utils/reducerActions/action";
export const ChangeAddress = ({ handleChangeAddress }) => {
  const {
    data: { addresses, orderAddress },
    dispatch,
  } = useData();
  const handleSetOrderAddress = (address) => {
    dispatch({ type: ACTION_TYPE.SET_ORDER_ADDRESS, payload: address });
    handleChangeAddress();
  };
  return (
    <div className="change-address-container">
      <div className="change-address-box">
        <div className="address-header">
          <h3>CHANGE DELIVERY ADDRESS</h3>
          <span onClick={handleChangeAddress}>
            <FaTimes />
          </span>
        </div>
        <div className="address-body">
          {addresses.map((address) => (
            <label key={address._id}>
              <input
                checked={orderAddress._id === address._id}
                type="radio"
                onChange={() => handleSetOrderAddress(address)}
              />{" "}
              <div className="address">
                <h3>{address.fullName}</h3>
                <p>{address.address}</p>
                <p>
                  {address.city} - {address.pinCode}
                </p>
                <p>Mobile - {address.mobileNumber}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
