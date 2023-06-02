import { v4 as uuid } from "uuid";

import { STATES_OF_INDIA } from "../../../Utils/Profile/Address_Details";
import "./Address.css";
import { useData } from "../../../context/DataContext";
import { useState } from "react";
import { ACTION_TYPE } from "../../../Utils/reducerActions/action";
export const Address = () => {
  const {
    data: { addresses },
    dispatch,
  } = useData();
  const [showForm, setShowForm] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    fullName: "",
    mobileNumber: "",
    pinCode: "",
    country: "",
    city: "",
    state: "default",
    address: "",
    isDefault: false,
  });
  const add_address_handler = (address) => {
    dispatch({
      type: ACTION_TYPE.ADD_ADDRESS,
      payload: { _id: uuid(), ...address },
    });
    setAddressDetails({
      fullName: "",
      mobileNumber: "",
      pinCode: "",
      country: "",
      city: "",
      state: "default",
      address: "",
      isDefault: false,
    });
    setShowForm(false);
  };
  const edit_address_handler = (address) => {
    setShowForm(true);
    setAddressDetails((prevData) => ({
      fullName: address.fullName,
      mobileNumber: address.mobileNumber,
      pinCode: address.pinCode,
      country: address.country,
      city: address.city,
      state: address.state,
      address: address.address,
      isDefault: address.isDefault,
    }));
    dispatch({ type: ACTION_TYPE.REMOVE_ADDRESS, payload: address._id });
  };
  const delete_address_handler = (addressId) => {
    dispatch({ type: ACTION_TYPE.REMOVE_ADDRESS, payload: addressId });
    setAddressDetails({
      fullName: "",
      mobileNumber: "",
      pinCode: "",
      country: "",
      city: "",
      state: "default",
      address: "",
      isDefault: false,
    });
  };
  const reset_address_field = () =>
    setAddressDetails({
      fullName: "",
      mobileNumber: "",
      pinCode: "",
      country: "",
      city: "",
      state: "default",
      address: "",
      isDefault: false,
    });
  const random_address_data = () =>
    setAddressDetails({
      fullName: "Aman Kumar Singh",
      mobileNumber: "7355080494",
      pinCode: "231217",
      country: "India",
      city: "Renukoot",
      state: "Uttar Pradesh",
      address: "Qtr H-393 Hindalco Colony Renukoot SoneBhadra",
      isDefault: false,
    });
  const cancel_address_field = () => {
    setShowForm(false);
    reset_address_field();
  };
  return (
    <div className="address-container">
      <div className="address-btn" onClick={() => setShowForm(true)}>
        <button>+</button> <p>Add New Address</p>
      </div>
      {showForm && (
        <div className="form-container">
          <div className="basic-info">
            <input
              required
              value={addressDetails.fullName}
              onChange={(e) =>
                setAddressDetails((prevDetails) => ({
                  ...prevDetails,
                  fullName: e.target.value,
                }))
              }
              type="text"
              placeholder="Full Name"
            />
            <input
              required
              value={addressDetails.mobileNumber}
              onChange={(e) =>
                setAddressDetails((prevDetails) => ({
                  ...prevDetails,
                  mobileNumber: e.target.value,
                }))
              }
              type="text"
              placeholder="Mobile Number "
              maxLength="10"
            />
            <input
              required
              value={addressDetails.pinCode}
              onChange={(e) =>
                setAddressDetails((prevDetails) => ({
                  ...prevDetails,
                  pinCode: e.target.value,
                }))
              }
              type="text"
              placeholder="Pincode"
              maxLength="6"
            />
            <input
              required
              value={addressDetails.country}
              onChange={(e) =>
                setAddressDetails((prevDetails) => ({
                  ...prevDetails,
                  country: e.target.value,
                }))
              }
              type="text"
              placeholder="Country"
            />
            <input
              required
              value={addressDetails.city}
              onChange={(e) =>
                setAddressDetails((prevDetails) => ({
                  ...prevDetails,
                  city: e.target.value,
                }))
              }
              type="text"
              placeholder="City"
            />
            <select
              required
              onChange={(e) =>
                e.target.value !== "default" &&
                setAddressDetails((prevDetails) => ({
                  ...prevDetails,
                  state: e.target.value,
                }))
              }
              className="select-dropdown"
            >
              <option value={addressDetails.state}>Choose State</option>
              {STATES_OF_INDIA.map((ele) => (
                <option
                  value={addressDetails.state}
                  key={uuid()}
                  className="options"
                >
                  {ele}
                </option>
              ))}
            </select>
          </div>
          <textarea
            onChange={(e) =>
              setAddressDetails((prevDetails) => ({
                ...prevDetails,
                address: e.target.value,
              }))
            }
            value={addressDetails.address}
            placeholder="Enter Address"
            maxLength={30}
          />
          <div className="action-btn-section">
            <button
              className="add"
              onClick={() => add_address_handler(addressDetails)}
            >
              Add
            </button>
            <button className="reset" onClick={() => reset_address_field()}>
              Reset
            </button>
            <button className="random" onClick={() => random_address_data()}>
              Random Data
            </button>
            <button className="cancel" onClick={() => cancel_address_field()}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {addresses.length > 0 &&
        addresses.map((address) => (
          <div key={address._id} className="address-data">
            <h1 className="full-name">{address.fullName}</h1>
            <h2 className="address">{address.address}</h2>
            <h2 className="city-pincode">
              {address.city} - {address.pinCode}
            </h2>
            <h2 className="state-country">
              {address.state} - {address.country}
            </h2>
            <h2 className="mobile-number"> Mobile: {address.mobileNumber}</h2>
            <div className="btn-section">
              <div
                className="edit"
                onClick={() => edit_address_handler(address)}
              >
                EDIT
              </div>
              <div
                className="delete"
                onClick={() => delete_address_handler(address._id)}
              >
                DELETE
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
