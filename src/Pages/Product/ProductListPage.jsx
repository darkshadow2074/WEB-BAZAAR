import "./ProductListPage.css";
import { FilterNav } from "./Component/FilterNav";
import { ProductList } from "./Component/ProductList";
import { FilterMobile } from "./Component/FilterMobile";

export const ProductListPage = () => {
  return (
    <div className="product-list-container">
      <FilterNav />
      <FilterMobile />
      <ProductList />
    </div>
  );
};
