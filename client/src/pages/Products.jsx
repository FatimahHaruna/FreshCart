import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

import { getProducts } from "../services/productService";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadProducts = async () => {

      try {

        const data = await getProducts();

        setProducts(data.products || data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    loadProducts();

  }, []);

  return (
    <section className="section">

      <h1>All Products</h1>

      {loading ? (
        <Loading />
      ) : (

        <div className="product-grid">

          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

      )}

    </section>
  );
};

export default Products;