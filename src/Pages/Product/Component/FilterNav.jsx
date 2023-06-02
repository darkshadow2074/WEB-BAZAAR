import { v4 as uuid } from "uuid";
import { useData } from "../../../context/DataContext";
import "./FilterNav.css";
import { ACTION_TYPE } from "../../../Utils/reducerActions/action";

export const FilterNav = () => {
  const { data, dispatch } = useData();
  const checkBoxHandler = (e, categoryName) => {
    if (e.target.checked) {
      dispatch({ type: ACTION_TYPE.ADD_CATEGORY, payload: categoryName });
    } else {
      dispatch({ type: ACTION_TYPE.REMOVE_CATEGORY, payload: categoryName });
    }
  };
  const priceRangeHandle = (e) => {
    dispatch({ type: ACTION_TYPE.PRICE_RANGE, payload: e.target.value });
  };
  const sortRatingHandler = (e, sortByProp) => {
    dispatch({ type: ACTION_TYPE.SORT_BY_RATING, payload: sortByProp });
  };

  const clearFilterHandler = () => dispatch({ type: ACTION_TYPE.CLEAR_FILTER });

  return (
    <div className="filterContainer">
      <div className="filter-header">
        <span className="filter-header-title">FILTERS</span>
        <button onClick={clearFilterHandler} className="clear-filter">
          Clear All
        </button>
      </div>
      <div className="category-container">
        <span className="category-header-title">CATEGORIES</span>
        <div className="category-list">
          {data?.categoryData.map((ele) => (
            <label key={uuid()}>
              <input
                type="checkbox"
                checked={data.categories.includes(ele)}
                onChange={(e) => checkBoxHandler(e, ele)}
              />{" "}
              <span>{ele}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="priceRange-container">
        <span className="priceRange-header-title">PRICE</span>
        <div className="priceRange-list">
          <div className="price-range">
            <span>100</span>
            <span>6500</span>
            <span>13000</span>
          </div>
          <input
            type="range"
            name="rangeInput"
            className="slider"
            min="100"
            max="13000"
            value={data?.priceRange}
            onChange={priceRangeHandle}
          />
        </div>
      </div>
      <div className="rating-container">
        <span className="rating-header-title">RATINGS</span>
        <div className="rating-list">
          {data?.ratingRange.map((ele) => (
            <label key={uuid()}>
              <input
                type="radio"
                checked={data.sortByRatings === ele}
                onChange={(e) => sortRatingHandler(e, ele)}
              />{" "}
              <span>{ele}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
