/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";

export const imageUrl = (image) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  const imagePath = image.startsWith("/") ? image : `/${image}`;
  if (imagePath.startsWith("/products/")) {
    return `/images${imagePath}`;
  }
  if (imagePath.startsWith("/categories/")) {
    return `/images${imagePath}`;
  }
  return imagePath;
};

export const products = [
  ["Apple", 3600, "Fruits", "/products/fruits/apple.webp", "6 per pack"], ["Banana", 4000, "Fruits", "/products/fruits/banana.webp", "1 bunch"], ["Mango", 5000, "Fruits", "/products/fruits/mango.webp", "10 pieces"], ["Orange", 3000, "Fruits", "/products/fruits/orange.webp", "20 per pack"], ["Pineapple", 1500, "Fruits", "/products/fruits/pineapple.webp", "1 piece"], ["Papaya", 1000, "Fruits", "/products/fruits/papaya.webp", "1 piece"], ["Grapes", 4500, "Fruits", "/products/fruits/grapes.webp", "500 g"], ["Strawberry", 5000, "Fruits", "/products/fruits/strawberry.webp", "250 g"], ["Blueberry", 5000, "Fruits", "/products/fruits/blueberry.webp", "250 g"], ["Pear", 3000, "Fruits", "/products/fruits/pear.webp", "4 per pack"],
  ["Carrot", 800, "Vegetables", "/products/vegetables/carrot.webp", "500 g"], ["Cabbage", 1200, "Vegetables", "/products/vegetables/cabbage.webp", "1 piece"], ["Broccoli", 2500, "Vegetables", "/products/vegetables/broccoli.webp", "1 kg"], ["Tomato", 4000, "Vegetables", "/products/vegetables/tomato.webp", "3 kg"], ["Cucumber", 4000, "Vegetables", "/products/vegetables/cucumber.webp", "3 pieces"], ["Bell Pepper", 4000, "Vegetables", "/products/vegetables/bellpepper.webp", "6 per pack"], ["Green Beans", 100, "Vegetables", "/products/vegetables/greenbeans.webp", "1 kg"], ["Cauliflower", 3500, "Vegetables", "/products/vegetables/cauliflower.webp", "1 piece"], ["Zucchini", 2000, "Vegetables", "/products/vegetables/zucchini.webp", "500 g"], ["Eggplant", 2000, "Vegetables", "/products/vegetables/eggplant.webp", "5 pieces"],
  ["Spinach", 1000, "Leafy Greens", "/products/leafygreens/spinach.webp", "1 bunch"], ["Lettuce", 1200, "Leafy Greens", "/products/leafygreens/lettuce.webp", "1 kg"], ["Kale", 1500, "Leafy Greens", "/products/leafygreens/kale.webp", "1 bunch"], ["Waterleaf", 1200, "Leafy Greens", "/products/leafygreens/waterleaf.webp", "1 kg"], ["Pumpkin leaves", 1000, "Leafy Greens", "/products/leafygreens/pumpkinleaves.webp", "1 kg"],
  ["Potato", 5000, "Root Vegetables", "/products/rootvegetables/potato.webp", "2 kg"], ["Sweet Potato", 3000, "Root Vegetables", "/products/rootvegetables/sweetpotato.webp", "2 kg"], ["Beetroot", 2000, "Root Vegetables", "/products/rootvegetables/beetroot.webp", "2 kg"], ["Cassava", 4000, "Root Vegetables", "/products/rootvegetables/cassava.webp", "2 kg"], ["Yam", 7000, "Root Vegetables", "/products/rootvegetables/yam.webp", "2 kg"], ["Ginger", 1500, "Root Vegetables", "/products/rootvegetables/ginger.webp", "500 g"],
  ["Mint", 800, "Herbs", "/products/herbs/mint.webp", "1 bunch"], ["Basil", 1000, "Herbs", "/products/herbs/basil.webp", "1 bunch"], ["Parsley", 800, "Herbs", "/products/herbs/parsley.webp", "1 bunch"], ["Cilantro", 1000, "Herbs", "/products/herbs/cilantro.webp", "1 bunch"], ["Rosemary", 800, "Herbs", "/products/herbs/rosemary.webp", "1 bunch"]
].map(([name, price, category, image, unit]) => ({ id: name.toLowerCase().replaceAll(" ", "-"), name, price, category, image: imageUrl(image), unit }));

export const categories = [
  ["Fruits", "Fresh and healthy fruits", "/categories/fruits.webp"], ["Vegetables", "Fresh vegetables for everyday meals", "/categories/vegetables.webp"], ["Leafy Greens", "Fresh leafy green vegetables", "/categories/leafygreens.webp"], ["Root Vegetables", "Fresh and nutritious root vegetables", "/categories/rootvegetables.webp"], ["Herbs", "Fresh herbs for cooking and seasoning", "/categories/herbs.webp"]
].map(([name, description, image]) => ({ name, description, image: imageUrl(image), count: products.filter((product) => product.category === name).length }));

export const normalizeProduct = (product) => ({ id: product._id, name: product.name, price: product.price / 100, category: product.category?.name || "Fresh produce", image: imageUrl(product.image), unit: product.unitQuantity });

export function useCatalog() {
  const [catalog, setCatalog] = useState({ products, categories });
  useEffect(() => {
    Promise.all([api.get("/products"), api.get("/category")]).then(([productResponse, categoryResponse]) => {
      setCatalog({ products: productResponse.data.products.map(normalizeProduct), categories: categoryResponse.data.categories.map((category) => ({ ...category, id: category._id, image: imageUrl(category.image), count: productResponse.data.products.filter((product) => product.category?._id === category._id).length })) });
    }).catch(() => {});
  }, []);
  return catalog;
}

export const money = (value) => `₦${value.toLocaleString()}`;

export function SectionTitle({ eyebrow, title, action }) {
  return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{action && <Link className="text-link" to={action.to}>{action.label} <span>→</span></Link>}</div>;
}

export function CategoryTile({ category }) {
  return <Link className="category-tile" to={`/products?category=${encodeURIComponent(category.name)}`}><div className="tile-image"><img src={category.image} alt="" /></div><strong>{category.name}</strong><span>{category.count} items</span></Link>;
}

export function ProductTile({ product }) {
  const { addItem } = useCart();
  return <article className="product-tile"><Link to={`/products/${product.id}`} className="product-image"><img src={product.image} alt={product.name} /><span className="fresh-badge">Fresh</span></Link><div className="product-copy"><span className="product-category">{product.category}</span><h3>{product.name}</h3><p>{product.unit}</p><div className="product-price"><strong>{money(product.price)}</strong><button aria-label={`Add ${product.name} to cart`} onClick={() => addItem(product.id, 1).catch(() => {})}>+</button></div></div></article>;
}

export function PageHeader({ eyebrow, title, copy }) {
  return <header className="page-header"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{copy && <p>{copy}</p>}</header>;
}
