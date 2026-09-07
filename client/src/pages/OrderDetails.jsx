import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrder } from "../services/orderService";
import { formatCurrency } from "../utils/formatCurrency";
import Loading from "../components/Loading";

const OrderDetails = () => {

  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadOrder = async () => {

      try {

        const data = await getOrder(id);

        setOrder(data.order || data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    loadOrder();

  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!order) {
    return <p>Order not found.</p>;
  }

  return (
    <section className="section">

      <h1>
        Order #{order._id}
      </h1>

      <p>
        Status: {order.status}
      </p>

      <div className="order-details">

        {order.items?.map((item) => (

          <div
            className="order-item"
            key={item._id}
          >

            <img
              src={item.product.image}
              alt={item.product.name}
            />

            <div>

              <h3>
                {item.product.name}
              </h3>

              <p>
                Quantity: {item.quantity}
              </p>

              <p>
                {formatCurrency(item.price)}
              </p>

            </div>

          </div>

        ))}

      </div>

      <h2>
        Total: {formatCurrency(order.total)}
      </h2>

    </section>
  );
};

export default OrderDetails;