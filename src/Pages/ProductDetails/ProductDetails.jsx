import { useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { ProductDetailCard } from "./components/ProductDetailCard";
import "./ProductDetail.css";
export const ProductDetails = () => {
  const { productId } = useParams();
  const { data } = useData();
  const productData = data.products.find((item) => item._id === productId);
  return (
    <div className="product-detail-container">
      <ProductDetailCard {...productData} />
    </div>
  );
};
