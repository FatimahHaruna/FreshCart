import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

const Cart = () => {

  const {
    cart,
    updateItem,
    removeItem,
  } = useCart();

  if (!cart || cart.items?.length === 0) {

    return (
      <section className="empty-page">

        <h1>Your Cart is Empty</h1>

        <p>
          Add some fresh products to your cart.
        </p>

        <Link
          to="/products"
          className="primary-btn"
        >
          Shop Products
        </Link>

      </section>
    );
  }

  const subtotal = cart.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const deliveryFee = 300;

  const total = subtotal + deliveryFee;

  return (
    <section className="section">

      <h1>My Cart</h1>

      <div className="cart-container">

        <div className="cart-items">

          {cart.items.map((item) => (

            <div
              className="cart-item"
              key={item.product._id}
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
                  {formatCurrency(item.product.price)}
                </p>

                <div className="quantity">

                  <button
                    onClick={() =>
                      updateItem(
                        item.product._id,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateItem(
                        item.product._id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>

              </div>

              <button
                onClick={() =>
                  removeItem(item.product._id)
                }
              >
                🗑️
              </button>

            </div>

          ))}

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
            Total:
            <strong>
              {formatCurrency(total)}
            </strong>
          </h2>

          <Link
            to="/checkout"
            className="primary-btn"
          >
            Proceed to Checkout →
          </Link>

        </div>

      </div>

    </section>
  );
};

export default Cart;