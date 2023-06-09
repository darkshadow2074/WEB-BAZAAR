import { v4 as uuid } from "uuid";
import { ACTION_TYPE } from "../Utils/reducerActions/action";

export const dataReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.INITIALIZE_CATEGORIES: {
      const data = action.payload.reduce(
        (acc, { category }) => [...acc, category],
        []
      );
      return {
        ...state,
        categoryData: [...data],
      };
    }
    case ACTION_TYPE.INITIALIZE_PRODUCTS: {
      return {
        ...state,
        products: [...action.payload],
        productCopy: [...action.payload],
      };
    }
    case ACTION_TYPE.ADD_CATEGORY: {
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    }
    case ACTION_TYPE.REMOVE_CATEGORY: {
      const data = state.categories.filter((ele) => ele !== action.payload);
      return {
        ...state,
        categories: data,
      };
    }
    case ACTION_TYPE.PRICE_RANGE: {
      return {
        ...state,
        priceRange: action.payload,
      };
    }
    case ACTION_TYPE.SEARCH: {
      return {
        ...state,
        search: action.payload,
      };
    }
    case ACTION_TYPE.SORT_BY_RATING: {
      return {
        ...state,
        sortByRatings: action.payload,
      };
    }
    case ACTION_TYPE.SORT_BY_PRICE: {
      return {
        ...state,
        sortByPrice: action.payload,
      };
    }
    case ACTION_TYPE.CLEAR_FILTER: {
      return {
        ...state,
        priceRange: "90000",
        sortByRatings: "",
        sortByPrice: "Recommended",
        search: "",
        categories: [],
        products: state.productCopy,
      };
    }
    case ACTION_TYPE.ADD_TO_CART: {
      return {
        ...state,
        cart: [...action.payload],
      };
    }
    case ACTION_TYPE.ADD_TO_WISHLIST: {
      return {
        ...state,
        wishList: [...action.payload],
      };
    }
    case ACTION_TYPE.ADD_ADDRESS: {
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };
    }
    case ACTION_TYPE.EDIT_ADDRESS: {
      return {
        ...state,
        addresses: state.addresses.reduce((acc, curr) =>
          curr._id === action.payload._id
            ? [...acc, { ...action.payload }]
            : [...acc, { ...curr }]
        ),
      };
    }
    case ACTION_TYPE.REMOVE_ADDRESS: {
      return {
        ...state,
        addresses: state.addresses.filter(
          (address) => address._id !== action.payload
        ),
      };
    }
    case ACTION_TYPE.LOAD_CART_WISHLIST: {
      return {
        ...state,
        cart: [...action?.payload?.cart],
        wishList: [...action?.payload?.wishlist],
      };
    }
    case ACTION_TYPE.REMOVE_CART_WISHLIST: {
      return {
        ...state,
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
    }
    case ACTION_TYPE.ADD_ORDER: {
      return {
        ...state,
        order: [...action.payload],
      };
    }
    case ACTION_TYPE.SET_ORDER_ADDRESS: {
      return {
        ...state,
        orderAddress: { ...action.payload },
      };
    }
    default:
      throw new Error("Error In Reducer");
  }
};
