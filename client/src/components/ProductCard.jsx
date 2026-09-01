function ProductCard ({ name, price, image, unitQuantity }) {
    return (
        <div>
            <img src={image} alt={name}></img>
            <h2>{name}</h2>
            <p>{price}</p>
            <p>{unitQuantity}</p>

            <button>Add to Cart</button>
        </div>
    )
}

export default ProductCard