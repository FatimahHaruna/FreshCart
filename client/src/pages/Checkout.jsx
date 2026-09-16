import { Link } from "react-router-dom";
export default function Checkout() {
  return (
    <div className="page-wrap checkout">
      <div className="page-header compact">
        <span className="eyebrow">Almost there</span>
        <h1>Checkout</h1>
      </div>
      <div className="checkout-grid">
        <form className="checkout-form">
          <h2>Delivery details</h2>
          <label>
            Full name
            <input placeholder="Your name" />
          </label>
          <label>
            Delivery address
            <input placeholder="Street address" />
          </label>
          <div className="form-row">
            <label>
              City
              <input placeholder="City" />
            </label>
            <label>
              Phone number
              <input placeholder="0800 000 0000" />
            </label>
          </div>
          <h2>Payment method</h2>
          <button className="payment-choice" type="button">
            ◉ Card or transfer <span>Secure checkout</span>
          </button>
        </form>
        <aside className="summary">
          <h2>Your order</h2>
          <div>
            <span>3 fresh items</span>
            <b>₦3,500</b>
          </div>
          <div>
            <span>Delivery fee</span>
            <b>₦300</b>
          </div>
          <hr />
          <div className="total">
            <span>Total</span>
            <b>₦3,800</b>
          </div>
          <Link className="button button-primary wide" to="/orders">
            Place order <span>→</span>
          </Link>
        </aside>
      </div>
    </div>
  );
}
