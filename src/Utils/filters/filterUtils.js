export const applySearchFilter = (data, search) => {
  const result = data.filter((ele) =>
    ele.title.toLowerCase().includes(search.toLowerCase())
  );
  return search.length === 0 ? data : result;
};

export const applyPriceRangeFilter = (data, price) => {
  return data.filter(({ price: ele_price }) => ele_price <= Number(price));
};

export const applyCheckBoxFilter = (data, categories) => {
  const result = data.filter((ele) =>
    categories.length > 0
      ? categories.some(
          (categ) => ele.category.toLowerCase() === categ.toLowerCase()
        )
      : true
  );
  return result;
};

export const applySortByRatingFilter = (data, rate) => {
  const result =
    rate.length > 0 ? data.filter((ele) => ele.rating >= rate[0]) : data;
  return result;
};

export const applySortByPriceFilter = (data, sortByPrice) => {
  if (sortByPrice === "Price Low To High") {
    return [...data].sort((a, b) => a.price - b.price);
  } else if (sortByPrice === "Price High To Low") {
    return [...data].sort((a, b) => b.price - a.price);
  } else if (sortByPrice === "Recommended") {
    return data;
  }
};
