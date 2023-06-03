import { v4 as uuid } from "uuid";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";

import { useData } from "../../../context/DataContext";
import "./FilterMobile.css";
import { ACTION_TYPE } from "../../../Utils/reducerActions/action";
import { useState } from "react";

export const FilterMobile = () => {
  const [showMobileFilterNav, setShowMobileFilterNav] = useState(false);
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

  const handleShowMobileFilterNav = () =>
    setShowMobileFilterNav((prevState) => !prevState);
  return (
    <div
      className={
        showMobileFilterNav
          ? "filter-mobileContainer maximize-filter-mobileContainer "
          : "filter-mobileContainer minimize-filter-mobileContainer"
      }
    >
      <div className="filter-headline">
        <h2>APPLY FILTERS</h2>
        <div className="showFilter">
          <span onClick={handleShowMobileFilterNav}>
            {showMobileFilterNav ? (
              <BsFillArrowDownCircleFill />
            ) : (
              <BsFillArrowUpCircleFill />
            )}
          </span>
        </div>
      </div>
      <div
        className={
          showMobileFilterNav ? "filter-header active" : "filter-header none"
        }
      >
        <span className="filter-header-title">FILTERS</span>
        <button onClick={clearFilterHandler} className="clear-filter">
          Clear All
        </button>
      </div>
      <div
        className={
          showMobileFilterNav
            ? "category-container active"
            : "category-container none"
        }
      >
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
      <div
        className={
          showMobileFilterNav
            ? "priceRange-container active"
            : "priceRange-container none"
        }
      >
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
      <div
        className={
          showMobileFilterNav
            ? "rating-container active"
            : "rating-container none"
        }
      >
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
