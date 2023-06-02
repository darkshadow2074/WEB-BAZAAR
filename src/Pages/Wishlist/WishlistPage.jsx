import { useData } from "../../context/DataContext";
import { EmptyCart } from "../Cart/component/EmptyCart";
import "./WishlistPage.css";
import { WishListCard } from "./component/WishListCard";
export const WishlistPage = () => {
  const { data } = useData();
  return data.wishList.length > 0 ? (
    <div className="wishlist-item-container">
      <h1 className="heading">
        My Wishlist - <span>{data?.wishList?.length} Items</span>
      </h1>
      <div className="wishlist-card-container">
        {data?.wishList.map((ele) => (
          <WishListCard key={ele._id} {...ele} />
        ))}
      </div>
    </div>
  ) : (
    <EmptyCart place="wishlist" />
  );
};
