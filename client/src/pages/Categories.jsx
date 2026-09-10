import CategoryCard from "../components/CategoryCard";

const categories = [
  {
    _id: "fruits",
    name: "Fruits",
    image: "/categories/fruits.webp",
  },
  {
    _id: "vegetables",
    name: "Vegetables",
    image: "/categories/vegetables.webp",
  },
  {
    _id: "leafy-greens",
    name: "Leafy Greens",
    image: "/categories/leafygreens.webp",
  },
  {
    _id: "root-vegetables",
    name: "Root Vegetables",
    image: "/categories/rootvegetables.webp",
  },
  {
    _id: "herbs-spices",
    name: "Herbs & Spices",
    image: "/categories/herbs.webp",
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