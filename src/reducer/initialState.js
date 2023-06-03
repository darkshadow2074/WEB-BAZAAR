import { v4 as uuid } from "uuid";
export const initialState = {
  priceRange: "13000",
  ratingRange: [
    "4 stars and above",
    "3 stars and above",
    "2 stars and above",
    "1 stars and above",
  ],
  sortByRatings: "",
  sortByPrice: "Recommended",
  search: "",
  categoryData: [],
  categories: [],
  products: [],
  cart: [],
  wishList: [],
  addresses: [
    {
      _id: uuid(),
      fullName: "Akash Kumar Singh",
      mobileNumber: "9113610178",
      pinCode: "231217",
      country: "India",
      city: "Renukoot",
      state: "Uttar Pradesh",
      address: "Qtr H-393 Hindalco Colony Renukoot Sonebhadra",
      isDefault: false,
    },
  ],
};
