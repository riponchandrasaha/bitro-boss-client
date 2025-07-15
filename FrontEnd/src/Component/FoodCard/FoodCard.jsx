

const FoodCard = ({ item }) => {
    const { name, image, price, recipe } = item;
    const handleAddToCart = food => {
        console.log(food);

    }
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={image}
                    alt="Shoes" />
            </figure>
            <p className=" absolute right-0 px-4 bg-red-500 text-white">${price}</p>
            <div className="card-body text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button
                        onClick={() => handleAddToCart(item)}
                        className="btn btn-dash btn-warning ">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;