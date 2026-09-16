import { Link } from "react-router-dom";
import {
  categories,
  products,
  CategoryTile,
  ProductTile,
  SectionTitle,
} from "./PagePrimitives";
import mainImage from "../assets/main.jpg";

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">100% fresh & healthy</span>
          <h1>
            Farm fresh
            <br />
            <em>fruits & vegetables</em>
          </h1>
          <p>
            From our farm to your table. Order the freshest produce online and
            get it delivered to your doorstep.
          </p>
          <Link className="button button-primary" to="/products">
            Shop now <span>→</span>
          </Link>
        </div>
        <div className="hero-art">
          <img src={mainImage} alt="Fresh vegetables in a basket" />
        </div>
      </section>
      <section className="content-section">
        <SectionTitle
          eyebrow="Explore our selection"
          title="Shop by categories"
          action={{ label: "View all", to: "/categories" }}
        />
        <div className="category-grid">
          {categories.slice(0, 4).map((category) => (
            <CategoryTile key={category.name} category={category} />
          ))}
        </div>
      </section>
      <section className="content-section">
        <SectionTitle
          eyebrow="Picked for you"
          title="Fresh arrivals"
          action={{ label: "See all products", to: "/products" }}
        />
        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <ProductTile key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="promise-row">
        <div>
          <span>✧</span>
          <strong>Freshness guaranteed</strong>
          <small>100% fresh produce</small>
        </div>
        <div>
          <span>⌁</span>
          <strong>Fast delivery</strong>
          <small>Quick delivery to your door</small>
        </div>
        <div>
          <span>▣</span>
          <strong>Secure payment</strong>
          <small>100% secure payments</small>
        </div>
        <div>
          <span>◌</span>
          <strong>Easy returns</strong>
          <small>Hassle-free returns</small>
        </div>
      </section>
    </div>
  );
}
