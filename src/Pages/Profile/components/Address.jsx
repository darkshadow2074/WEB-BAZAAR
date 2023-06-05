import { v4 as uuid } from "uuid";

import { STATES_OF_INDIA } from "../../../Utils/Profile/Address_Details";
import "./Address.css";
import { useData } from "../../../context/DataContext";
import { useState } from "react";
import { ACTION_TYPE } from "../../../Utils/reducerActions/action";
import {
  validateMobile,
  validateOnlyString,
  validatePinCode,
} from "../../../Utils/validators/validatorFunctions";
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
  const [addressFieldError, setAddressFieldError] = useState({
    fullName_error: "",
    mobileNumber_error: "",
    pinCode_error: "",
    country_error: "",
    city_error: "",
    state_error: "",
    address_error: "",
  });

  const handleFullNameFieldChange = (e) => {
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      fullName: e.target.value,
    }));
    if (!validateOnlyString(e.target.value)) {
      setAddressFieldError((prevData) => ({
        ...prevData,
        fullName_error: "Full Name should be in strings",
      }));
    } else {
      setAddressFieldError((prevData) => ({
        ...prevData,
        fullName_error: "",
      }));
    }
  };
  const handleMobileNumberFieldChange = (e) => {
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      mobileNumber: e.target.value,
    }));
    if (!validateMobile(e.target.value)) {
      setAddressFieldError((prevData) => ({
        ...prevData,
        mobileNumber_error: "Mobile Number is not valid",
      }));
    } else {
      setAddressFieldError((prevData) => ({
        ...prevData,
        mobileNumber_error: "",
      }));
    }
  };
  const handlePinCodeFieldChange = (e) => {
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      pinCode: e.target.value,
    }));
    if (!validatePinCode(e.target.value)) {
      setAddressFieldError((prevData) => ({
        ...prevData,
        pinCode_error: "Pincode not valid",
      }));
    } else {
      setAddressFieldError((prevData) => ({
        ...prevData,
        pinCode_error: "",
      }));
    }
  };
  const handleCountryFieldChange = (e) => {
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      country: e.target.value,
    }));
    if (!validateOnlyString(e.target.value)) {
      setAddressFieldError((prevData) => ({
        ...prevData,
        country_error: "Country should be in strings",
      }));
    } else {
      setAddressFieldError((prevData) => ({
        ...prevData,
        country_error: "",
      }));
    }
  };
  const handleCityFieldChange = (e) => {
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      city: e.target.value,
    }));
    if (!validateOnlyString(e.target.value)) {
      setAddressFieldError((prevData) => ({
        ...prevData,
        city_error: "City should be in strings",
      }));
    } else {
      setAddressFieldError((prevData) => ({
        ...prevData,
        city_error: "",
      }));
    }
  };
  const handleStateFieldChange = (e) =>
    e.target.value !== "default" &&
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      state: e.target.value,
    }));
  const handleAddressFieldChange = (e) =>
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      address: e.target.value,
    }));

  const add_address_handler = (address) => {
    let newError = {};
    let isAnyError = false;
    Object.keys(addressDetails).forEach((ele) => {
      newError[ele + "_error"] = "";
      if (addressDetails[ele] === "" || addressDetails[ele] === "default") {
        newError[ele + "_error"] = `${ele} shouldn't be empty`;
        isAnyError = true;
      }
    });
    if (isAnyError) {
      setAddressFieldError(newError);
    } else {
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
      setAddressFieldError({
        fullName_error: "",
        mobileNumber_error: "",
        pinCode_error: "",
        country_error: "",
        city_error: "",
        state_error: "",
        address_error: "",
      });
      setShowForm(false);
    }
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
    setAddressFieldError({
      fullName_error: "",
      mobileNumber_error: "",
      pinCode_error: "",
      country_error: "",
      city_error: "",
      state_error: "",
      address_error: "",
    });
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
              onChange={handleFullNameFieldChange}
              type="text"
              placeholder="Full Name"
            />
            <div className="error-section">
              {addressFieldError.fullName_error.length > 0 && (
                <span>{addressFieldError.fullName_error}</span>
              )}
            </div>
            <input
              required
              value={addressDetails.mobileNumber}
              onChange={handleMobileNumberFieldChange}
              type="text"
              placeholder="Mobile Number "
              maxLength="10"
            />
            <div className="error-section">
              {addressFieldError.mobileNumber_error.length > 0 && (
                <span>{addressFieldError.mobileNumber_error}</span>
              )}
            </div>
            <input
              required
              value={addressDetails.pinCode}
              onChange={handlePinCodeFieldChange}
              type="text"
              placeholder="Pincode"
              maxLength="6"
            />
            <div className="error-section">
              {addressFieldError.pinCode_error.length > 0 && (
                <span>{addressFieldError.pinCode_error}</span>
              )}
            </div>
            <input
              required
              value={addressDetails.country}
              onChange={handleCountryFieldChange}
              type="text"
              placeholder="Country"
            />
            <div className="error-section">
              {addressFieldError.country_error.length > 0 && (
                <span>{addressFieldError.country_error}</span>
              )}
            </div>
            <input
              required
              value={addressDetails.city}
              onChange={handleCityFieldChange}
              type="text"
              placeholder="City"
            />
            <div className="error-section">
              {addressFieldError.city_error.length > 0 && (
                <span>{addressFieldError.city_error}</span>
              )}
            </div>
            <select
              required
              onChange={handleStateFieldChange}
              className="select-dropdown"
              value={addressDetails.state}
            >
              <option value="default">Choose State</option>
              {STATES_OF_INDIA.map((ele) => (
                <option value={ele} key={uuid()} className="options">
                  {ele}
                </option>
              ))}
            </select>
            <div className="error-section">
              {addressFieldError.state_error.length > 0 && (
                <span>{addressFieldError.state_error}</span>
              )}
            </div>
          </div>
          <textarea
            required
            onChange={handleAddressFieldChange}
            value={addressDetails.address}
            placeholder="Enter Address"
          />
          <div className="error-section">
            {addressFieldError.address_error.length > 0 && (
              <span>{addressFieldError.address_error}</span>
            )}
          </div>
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
