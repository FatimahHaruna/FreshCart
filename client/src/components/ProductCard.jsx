import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    try {
      await addItem(product._id, 1);
      alert("Product added to cart!");
    } catch (error) {
      console.error(error);
      alert("Please login before adding items to your cart.");
    }
  };

  return (
    <div className="product-card">

      <Link to={`/products/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
        />
      </Link>

      <div className="product-info">

        <span className="product-category">
          {product.category?.name}
        </span>

        <h3>{product.name}</h3>

        <p className="product-type">
          {product.type}
        </p>

        <div className="product-bottom">

          <strong>
            {formatCurrency(product.price)}
          </strong>

          <button onClick={handleAddToCart}>
            Add
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;