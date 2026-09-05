import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProduct } from "../services/productService";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import Loading from "../components/Loading";

const ProductDetails = () => {

  const { id } = useParams();

  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadProduct = async () => {

      try {

        const data = await getProduct(id);

        setProduct(data.product || data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    loadProduct();

  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleAddToCart = async () => {

    await addItem(product._id, quantity);

    alert("Product added to cart!");
  };

  return (
    <section className="product-details">

      <div className="product-details-image">

        <img
          src={product.image}
          alt={product.name}
        />

      </div>

      <div className="product-details-info">

        <span>
          {product.category?.name}
        </span>

        <h1>{product.name}</h1>

        <h2>
          {formatCurrency(product.price)}
        </h2>

        <p>
          {product.description}
        </p>

        <p>
          Type: {product.type}
        </p>

        <div className="quantity">

          <button
            onClick={() =>
              setQuantity((q) => Math.max(1, q - 1))
            }
          >
            −
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              setQuantity((q) => q + 1)
            }
          >
            +
          </button>

        </div>

        <button
          className="primary-btn"
          onClick={handleAddToCart}
        >
          🛒 Add to Cart
        </button>

      </div>

    </section>
  );
};

export default ProductDetails;