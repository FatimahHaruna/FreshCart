import { Link } from "react-router-dom";
import { products, money, PageHeader } from "./PagePrimitives";
export default function Orders() {
  const orders = [
    { id: "ORD12345", date: "18 May 2024", status: "Delivered", total: 3800 },
    { id: "ORD12344", date: "10 May 2024", status: "Delivered", total: 2900 },
    { id: "ORD12343", date: "02 May 2024", status: "Processing", total: 2200 },
  ];
  return (
    <div className="page-wrap">
      <PageHeader
        eyebrow="Your fresh history"
        title="My orders"
        copy="Keep track of every delivery from farm to door."
      />
      <div className="tabs">
        <button className="active">All orders</button>
        <button>Processing</button>
        <button>Delivered</button>
      </div>
      <section className="orders-list">
        {orders.map((order) => (
          <div className="order-row" key={order.id}>
            <div className="order-thumbs">
              {products.slice(0, 3).map((product) => (
                <img key={product.id} src={product.image} alt="" />
              ))}
            </div>
            <div>
              <strong>Order #{order.id}</strong>
              <span>{order.date}</span>
            </div>
            <span className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
            <b>{money(order.total)}</b>
            <Link to={`/orders/${order.id}`}>View details →</Link>
          </div>
        ))}
      </section>
    </div>
  );
}
