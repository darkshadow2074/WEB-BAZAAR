export const get_total_original_price = ({ cart }) =>
  cart.reduce((acc, { qty, original_price }) => acc + qty * original_price, 0);

export const get_total_price = ({ cart }) =>
  cart.reduce((acc, { qty, price }) => acc + qty * price, 0);
export const get_total_discount_percentage = (
  total_original_price,
  total_actual_price
) =>
  (
    ((total_original_price - total_actual_price) / total_original_price) *
    100
  ).toFixed(3);

export const get_total_discount_price = (
  total_original_price,
  total_actual_price
) => {
  const discounted_percentage = get_total_discount_percentage(
    total_original_price,
    total_actual_price
  );
  return ((total_original_price * discounted_percentage) / 100).toFixed(0);
};
