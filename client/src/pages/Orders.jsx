import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOrders } from "../services/orderService";
import { formatCurrency } from "../utils/formatCurrency";
import Loading from "../components/Loading";

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadOrders = async () => {

      try {

        const data = await getOrders();

        setOrders(data.orders || data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    loadOrders();

  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="section">

      <h1>My Orders</h1>

      {orders.length === 0 ? (

        <p>You haven't placed any orders yet.</p>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order._id}
            >

              <div>

                <h3>
                  Order #{order._id}
                </h3>

                <p>
                  Status: {order.status}
                </p>

                <p>
                  Total:{" "}
                  {formatCurrency(order.total)}
                </p>

              </div>

              <Link
                to={`/orders/${order._id}`}
              >
                View Details
              </Link>

            </div>

          ))}

        </div>

      )}

    </section>
  );
};

export default Orders;