import CategoryCard from "../components/CategoryCard";

const categories = [
  {
    _id: "fruits",
    name: "Fruits",
    image: "/images/fruits.jpg",
  },
  {
    _id: "vegetables",
    name: "Vegetables",
    image: "/images/vegetables.jpg",
  },
  {
    _id: "leafy-greens",
    name: "Leafy Greens",
    image: "/images/leafy-greens.jpg",
  },
  {
    _id: "root-vegetables",
    name: "Root Vegetables",
    image: "/images/root-vegetables.jpg",
  },
  {
    _id: "herbs-spices",
    name: "Herbs & Spices",
    image: "/images/herbs.jpg",
  },
];

const Categories = () => {

  return (
    <section className="section">

      <h1>All Categories</h1>

      <div className="category-grid">

        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
          />
        ))}

      </div>

    </section>
  );
};

export default Categories;