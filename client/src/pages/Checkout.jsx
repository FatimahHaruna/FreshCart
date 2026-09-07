import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { formatCurrency } from "../utils/formatCurrency";

const Checkout = () => {

  const { cart } = useCart();

  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  if (!cart || cart.items?.length === 0) {

    return <p>Your cart is empty.</p>;
  }

  const subtotal = cart.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const deliveryFee = 300;

  const total = subtotal + deliveryFee;

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data = await createOrder({
        items: cart.items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),

        deliveryAddress: address,

        total,
      });

      navigate(`/orders/${data.order?._id || data._id}`);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to create order"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <section className="checkout-page">

      <div>

        <h1>Checkout</h1>

        <form onSubmit={handleSubmit}>

          <label>
            Delivery Address
          </label>

          <textarea
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            required
            placeholder="Enter your delivery address"
          />

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : "Place Order"}
          </button>

        </form>

      </div>

      <div className="cart-summary">

        <h2>Order Summary</h2>

        <p>
          Subtotal:
          <strong>
            {formatCurrency(subtotal)}
          </strong>
        </p>

        <p>
          Delivery:
          <strong>
            {formatCurrency(deliveryFee)}
          </strong>
        </p>

        <hr />

        <h2>
          Total: {formatCurrency(total)}
        </h2>

      </div>

    </section>
  );
};

export default Checkout;