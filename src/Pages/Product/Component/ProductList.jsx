import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../../context/DataContext";
import { ProductCard } from "./ProductCard";
import { useFilterHook } from "../../../Hooks/filterData";
import { ACTION_TYPE } from "../../../Utils/reducerActions/action";

export const ProductList = () => {
  const { filteredData } = useFilterHook();
  const { data, dispatch } = useData();
  const handleSortByPrice = (val) => {
    dispatch({ type: ACTION_TYPE.SORT_BY_PRICE, payload: val });
  };
  return (
    <div className="productlist">
      <div className="product-top-bar">
        <h2>WEB BAZZAR FASHION STORE - {filteredData.length} ITEMS</h2>
        <div className="sort-by-price">
          <div className="selected-list">
            <span>Sort By</span> : <b>{data.sortByPrice}</b>{" "}
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <ul className="sort-list">
            <li>
              <label>
                Recommended{" "}
                <input
                  type="radio"
                  value="Recommended"
                  checked={data.sortByPrice === "Recommended"}
                  onChange={() => handleSortByPrice("Recommended")}
                />
              </label>
            </li>
            <li>
              <label>
                Price Low To High{" "}
                <input
                  type="radio"
                  value="Price Low To High"
                  checked={data.sortByPrice === "Price Low To High"}
                  onChange={() => handleSortByPrice("Price Low To High")}
                />
              </label>
            </li>
            <li>
              <label>
                Price High To Low{" "}
                <input
                  type="radio"
                  value="Price High To Low"
                  checked={data.sortByPrice === "Price High To Low"}
                  onChange={() => handleSortByPrice("Price High To Low")}
                />
              </label>
            </li>
          </ul>
        </div>
      </div>
      {
        <div className="product-card-container">
          {filteredData?.map((ele) => (
            <ProductCard key={ele._id} {...ele} />
          ))}
        </div>
      }
    </div>
  );
};
