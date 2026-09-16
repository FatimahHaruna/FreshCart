import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/products?category=${category._id}`}
      className="category-card"
    >
      <img
        src={category.image}
        alt={category.name}
      />

      <h3>{category.name}</h3>

      {category.description && (
        <p>{category.description}</p>
      )}
    </Link>
  );
};

export default CategoryCard;