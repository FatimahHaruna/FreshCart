import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          🛒 FreshCart
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/products">Products</Link>
          <Link to="/orders">Orders</Link>
        </nav>

        <div className="navbar-actions">

          <Link to="/cart" className="cart-link">
            🛒
            {itemCount > 0 && (
              <span className="cart-count">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <span>Hello, {user.name}</span>

              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </header>
  );
};

export default Navbar;