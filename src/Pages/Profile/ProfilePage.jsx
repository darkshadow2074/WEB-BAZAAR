import { useState } from "react";
import "./ProfilePage.css";
import { Address } from "./components/Address";
import { ProfileInfo } from "./components/ProfileInfo";
import { OrderHistory } from "./components/OrderHistory";
export const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("Profile Information");
  return (
    <div className="profile-page">
      <div className="profile-page-block">
        <div className="profile-tab-header">
          <p
            onClick={() => setSelectedTab("Profile Information")}
            className={selectedTab === "Profile Information" ? "active" : null}
          >
            Profile Information
          </p>
          <p
            onClick={() => setSelectedTab("Address")}
            className={selectedTab === "Address" ? "active" : null}
          >
            Addresses
          </p>
          <p
            onClick={() => setSelectedTab("Order History")}
            className={selectedTab === "Order History" ? "active" : null}
          >
            Order History
          </p>
        </div>
        <div className="profile-tab-body">
          {selectedTab === "Profile Information" && <ProfileInfo />}
          {selectedTab === "Address" && <Address />}
          {selectedTab === "Order History" && <OrderHistory />}
        </div>
      </div>
    </div>
  );
};
