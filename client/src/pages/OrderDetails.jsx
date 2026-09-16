import { Link, useParams } from "react-router-dom";
export default function OrderDetails() {
  const { id } = useParams();
  return (
    <div className="page-wrap">
      <div className="breadcrumbs">
        <Link to="/orders">My orders</Link> / Order #{id}
      </div>
      <div className="detail-panel">
        <span className="eyebrow">Delivered successfully</span>
        <h1>Order #{id}</h1>
        <p>
          Thanks for choosing better food. Your order is on its way to your
          kitchen.
        </p>
        <div className="order-progress">
          <span className="done">
            ✓<small>Placed</small>
          </span>
          <span className="done">
            ✓<small>Processing</small>
          </span>
          <span className="done">
            ✓<small>Delivered</small>
          </span>
        </div>
        <Link className="button button-primary" to="/products">
          Shop again <span>→</span>
        </Link>
      </div>
    </div>
  );
}
