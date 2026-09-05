import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import Loading from "../components/Loading";

import { getProducts } from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data.products || data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <span>100% Fresh & Healthy</span>

          <h1>
            Farm Fresh
            <br />
            <strong>Fruits & Vegetables</strong>
          </h1>

          <p>
            From farm to your table. Order the freshest produce
            online and get it delivered to your doorstep.
          </p>

          <Link to="/products" className="primary-btn">
            Shop Now →
          </Link>

        </div>

        <div className="hero-image">
          🥦 🍅 🍎 🥕 🍌
        </div>

      </section>


      {/* CATEGORIES */}

      <section className="section">

        <div className="section-header">
          <h2>Shop by Categories</h2>

          <Link to="/categories">
            View All
          </Link>
        </div>

        <div className="category-grid">

          <CategoryCard
            category={{
              _id: "fruits",
              name: "Fruits",
              image: "/images/fruits.jpg",
            }}
          />

          <CategoryCard
            category={{
              _id: "vegetables",
              name: "Vegetables",
              image: "/images/vegetables.jpg",
            }}
          />

          <CategoryCard
            category={{
              _id: "leafy-greens",
              name: "Leafy Greens",
              image: "/images/leafy-greens.jpg",
            }}
          />

        </div>

      </section>


      {/* PRODUCTS */}

      <section className="section">

        <div className="section-header">

          <h2>Popular Products</h2>

          <Link to="/products">
            View All
          </Link>

        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="product-grid">

            {products.slice(0, 8).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>
        )}

      </section>

    </div>
  );
};

export default Home;