import { useParams, Link } from "react-router-dom";
import { money, ProductTile, useCatalog } from "./PagePrimitives";
import { useCart } from "../context/CartContext";
export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useCatalog();
  const product = products.find((item) => item.id === id)
    || products.find((item) => item.name.toLowerCase().replaceAll(" ", "-") === id)
    || products[0];
  const { addItem } = useCart();

  if (!product) return null;

  return (
    <div className="page-wrap">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> / <Link to="/products">Fresh produce</Link> /{" "}
        {product.name}
      </div>
      <section className="detail-layout">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-copy">
          <span className="eyebrow detail-eyebrow">{product.category} · Fresh</span>
          <h1>{product.name}</h1>
          <div className="rating">
            ★★★★★ <span>(120 reviews)</span>
          </div>
          <strong className="detail-price">{money(product.price)}</strong>
          <p>
            Crisp, juicy and naturally sweet. Carefully selected from trusted
            local farms and delivered fresh to your door.
          </p>
          <div className="choice">
            <span>Pack size</span>
            <button className="choice-active">{product.unit}</button>
            <button>1kg</button>
            <button>2kg</button>
          </div>
          <div className="quantity">
            <span>Quantity</span>
            <button>−</button>
            <b>1</b>
            <button>+</button>
          </div>
          <button
            className="button button-primary wide"
            onClick={() => addItem(product.id, 1).catch(() => {})}
          >
            Add to cart <span>→</span>
          </button>
          <button className="button button-outline wide">Buy now</button>
        </div>
      </section>
      <div className="detail-benefits">
        <span>
          ♡ <b>100% fresh</b> Farm picked
        </span>
        <span>
          ♧ <b>No preservatives</b> Naturally grown
        </span>
        <span>
          ♢ <b>Rich in nutrients</b> Healthy choice
        </span>
      </div>
      <section className="content-section">
        <h2>You may also like</h2>
        <div className="product-grid">
          {products.slice(1, 5).map((item) => (
            <ProductTile key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
