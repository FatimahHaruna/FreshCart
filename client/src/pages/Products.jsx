import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductTile, PageHeader, useCatalog } from "./PagePrimitives";

export default function Products() {
  const { products } = useCatalog();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category")?.trim() || "";
  const visibleProducts = useMemo(() => {
    if (!selectedCategory) return products;

    return products.filter(
      (product) =>
        product.category?.trim().toLowerCase() === selectedCategory.toLowerCase(),
    );
  }, [products, selectedCategory]);

  return (
    <div className="page-wrap">
      <PageHeader
        eyebrow="The market is open"
        title={selectedCategory || "Fresh produce"}
        copy="Picked at peak freshness and ready for your table."
      />
      <div className="catalog-toolbar">
        <span>{visibleProducts.length} products</span>
        <select aria-label="Sort products">
          <option>Sort: Featured</option>
          <option>Price: low to high</option>
          <option>Price: high to low</option>
        </select>
      </div>
      <div className="product-grid product-grid-catalog">
        {visibleProducts.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
