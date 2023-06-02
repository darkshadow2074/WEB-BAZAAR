import {
  applyCheckBoxFilter,
  applyPriceRangeFilter,
  applySortByRatingFilter,
  applySearchFilter,
  applySortByPriceFilter,
} from "../Utils/filters/filterUtils";
import { useData } from "../context/DataContext";

export const useFilterHook = () => {
  const { data } = useData();
  const applyFilters = (data) => {
    const {
      priceRange,
      sortByRatings,
      sortByPrice,
      search,
      categories,
      products,
    } = data;
    let newData = [...products];
    newData = applySearchFilter(newData, search);
    newData = applyPriceRangeFilter(newData, priceRange);
    newData = applyCheckBoxFilter(newData, categories);
    newData = applySortByRatingFilter(newData, sortByRatings);
    newData = applySortByPriceFilter(newData, sortByPrice);
    return newData;
  };
  return { filteredData: applyFilters(data) };
};
