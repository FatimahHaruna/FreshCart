import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="empty-state">
      <span className="eyebrow">Oops</span>
      <h1>That page is out of season.</h1>
      <p>Let's get you back to the good stuff.</p>
      <Link className="button button-primary" to="/">
        Back home <span>→</span>
      </Link>
    </div>
  );
}
