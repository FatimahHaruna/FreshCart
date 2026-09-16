import { ProductTile, PageHeader, useCatalog } from "./PagePrimitives";
export default function Products() {
  const { products } = useCatalog();
  return (
    <div className="page-wrap">
      <PageHeader
        eyebrow="The market is open"
        title="Fresh produce"
        copy="Picked at peak freshness and ready for your table."
      />
      <div className="catalog-toolbar">
        <span>{products.length} products</span>
        <select aria-label="Sort products">
          <option>Sort: Featured</option>
          <option>Price: low to high</option>
          <option>Price: high to low</option>
        </select>
      </div>
      <div className="product-grid product-grid-catalog">
        {products.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
