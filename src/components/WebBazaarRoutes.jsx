import { Route, Routes } from "react-router-dom";
import { HomePage } from "../Pages/Home/HomePage";
import { ProductListPage } from "../Pages/Product/ProductListPage";
import { MockMan } from "../Pages/MockMan";
import { ProductDetails } from "../Pages/ProductDetails/ProductDetails";
import { LoginPage } from "../Pages/Auth/Login/LoginPage";
import { SignupPage } from "../Pages/Auth/Signup/SignupPage";
import { WishlistPage } from "../Pages/Wishlist/WishlistPage";
import { CartPage } from "../Pages/Cart/CartPage";
import { RequireAuth } from "./RequiresAuth";
import { ProfilePage } from "../Pages/Profile/ProfilePage";
import { Orders } from "../Pages/Orders/Orders";

export const WebBazaarRoutes = () => {
  return (
    <div className="webBazaar-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductListPage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route
          path="/wishlist"
          element={
            <RequireAuth>
              <WishlistPage />
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <CartPage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <RequireAuth>
              <Orders />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/test" element={<MockMan />} />
      </Routes>
    </div>
  );
};
