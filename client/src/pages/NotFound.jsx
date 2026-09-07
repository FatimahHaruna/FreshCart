import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="empty-page">

      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="primary-btn"
      >
        Back Home
      </Link>

    </section>
  );
};

export default NotFound;