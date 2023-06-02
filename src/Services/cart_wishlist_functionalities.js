import { TOAST_TYPES, Toast_Handler } from "../Utils/Toast/toastConstants";
import {
  postCartItems,
  IncreamentDecreamentCartItems,
  DeleteCartItems,
  postWishlistItems,
  DeleteWishlistItems,
} from "./service";
import { ACTION_TYPE } from "../Utils/reducerActions/action";

export const Add_To_Bag = async (params, navigate, data, dispatch) => {
  const findAlreadyExistingData = data.cart.find(
    (item) => item._id === params.product._id
  );

  try {
    if (!params.encodedToken) {
      navigate("/login");
    } else {
      if (findAlreadyExistingData) {
        const {
          data: { cart },
          status,
        } = await IncreamentDecreamentCartItems({
          productId: findAlreadyExistingData._id,
          actionType: "increment",
          encodedToken: params.encodedToken,
        });
        if (status === 200) {
          await dispatch({ type: ACTION_TYPE.ADD_TO_CART, payload: cart });
          Toast_Handler(TOAST_TYPES.Success, "Added to bag");
        }
      } else {
        const {
          data: { cart },
          status,
        } = await postCartItems(params);
        if (status === 201) {
          dispatch({ type: ACTION_TYPE.ADD_TO_CART, payload: cart });
          Toast_Handler(TOAST_TYPES.Success, "Added to bag");
        }
      }
    }
  } catch (err) {
    console.log(err.response.data);
    Toast_Handler(TOAST_TYPES.eError, "Something went wrong");
  }
};
export const Remove_From_Bag = async (
  { productId, encodedToken },
  navigate,
  dispatch
) => {
  try {
    if (!encodedToken) {
      navigate("/login");
    } else {
      const {
        data: { cart },
        status,
      } = await DeleteCartItems({ productId, encodedToken });
      if (status === 200) {
        dispatch({ type: ACTION_TYPE.ADD_TO_CART, payload: cart });
        Toast_Handler(TOAST_TYPES.Warn, "Item removed from bag");
      }
    }
  } catch (err) {
    console.log(err.response.data);
    Toast_Handler(TOAST_TYPES.Error, "Something went wrong");
  }
};
export const Add_To_Wishlist = async (params, navigate, data, dispatch) => {
  const findAlreadyExistingData = data.wishList.find(
    (item) => item._id === params.product._id
  );
  try {
    if (!params.encodedToken) {
      navigate("/login");
    } else {
      if (!findAlreadyExistingData) {
        const {
          data: { wishlist },
          status,
        } = await postWishlistItems(params);
        if (status === 201) {
          dispatch({ type: ACTION_TYPE.ADD_TO_WISHLIST, payload: wishlist });
        }
        Toast_Handler(TOAST_TYPES.Success, "Added to wishlist");
      } else {
        Toast_Handler(TOAST_TYPES.Info, "Item already in wishlist");
      }
    }
  } catch (err) {
    console.log(err.response.data);
    Toast_Handler(TOAST_TYPES.Error, "Something went wrong");
  }
};
export const Increment_Decrement_Handler = async (
  { productId, encodedToken },
  actionType,
  data,
  navigate,
  dispatch
) => {
  const findExistingData = data.cart.find((item) => item._id === productId);
  try {
    if (!encodedToken) {
      navigate("/login");
    } else {
      if (findExistingData.qty <= 1 && actionType === "decrement") {
        const {
          data: { cart },
          status,
        } = await DeleteCartItems({ productId, encodedToken });
        if (status === 200) {
          dispatch({ type: ACTION_TYPE.ADD_TO_CART, payload: cart });
          Toast_Handler(TOAST_TYPES.Info, "Item removed from bag");
        }
      } else {
        const {
          data: { cart },
          status,
        } = await IncreamentDecreamentCartItems({
          productId,
          actionType,
          encodedToken,
        });
        if (status === 200) {
          dispatch({ type: ACTION_TYPE.ADD_TO_CART, payload: cart });
        }
      }
    }
  } catch (err) {
    console.log(err.response.data);
    Toast_Handler(TOAST_TYPES.Error, "Something went wrong");
  }
};
export const Remove_From_Wishlist = async (
  { productId, encodedToken },
  navigate,
  dispatch
) => {
  try {
    if (encodedToken) {
      const {
        data: { wishlist },
        status,
      } = await DeleteWishlistItems({ productId, encodedToken });
      if (status === 200) {
        dispatch({ type: ACTION_TYPE.ADD_TO_WISHLIST, payload: wishlist });
        Toast_Handler(TOAST_TYPES.Warn, "Removed from wishlist");
      }
    } else {
      navigate("/login");
    }
  } catch (err) {
    console.log(err.response);
    Toast_Handler(TOAST_TYPES.Error, "Something went wrong");
  }
};
