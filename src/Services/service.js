import axios from "axios";
export const signupService = async ({
  email,
  password,
  first_name,
  last_name,
}) =>
  axios.post("/api/auth/signup", {
    name: `${first_name} ${last_name}`,
    email,
    password,
  });
export const loginService = ({ email, password }) =>
  axios.post("/api/auth/login", { email, password });
export const loadAllProducts = async () => axios.get("/api/products");
export const loadAllCategories = async () => axios.get("/api/categories");
export const getCartItems = async ({ encodedToken }) =>
  axios.get("/api/user/cart", {
    headers: {
      authorization: encodedToken,
    },
  });
export const postCartItems = async ({ product, encodedToken }) =>
  axios.post(
    "/api/user/cart",
    { product },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
export const IncreamentDecreamentCartItems = async ({
  productId,
  actionType,
  encodedToken,
}) =>
  await axios.post(
    `/api/user/cart/${productId}`,
    {
      action: {
        type: actionType,
      },
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const getWishlistItems = async ({ encodedToken }) =>
  axios.get("/api/user/wishlist", {
    headers: {
      authorization: encodedToken,
    },
  });
export const postWishlistItems = async ({ product, encodedToken }) =>
  axios.post(
    "/api/user/wishlist",
    {
      product,
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
export const DeleteWishlistItems = async ({ productId, encodedToken }) =>
  axios.delete(`/api/user/wishlist/${productId}`, {
    headers: {
      authorization: encodedToken,
    },
  });

export const DeleteCartItems = async ({ productId, encodedToken }) => {
  return axios.delete(`/api/user/cart/${productId}`, {
    headers: {
      authorization: encodedToken,
    },
  });
};
