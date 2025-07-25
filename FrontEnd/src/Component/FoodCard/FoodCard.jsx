import Swal from 'sweetalert2';
import useAuth from "../../Hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCart from '../../Hooks/useCart';



/* import axios from 'axios'; */
const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

    const [,refetch] =useCart();
    const handleAddToCart = food => {
        if (user && user.email) {

            console.log(user.email, food);
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
                /*  const axiosSecure = axios.create({
                     baseURL: 'https://bistro-boss-pbh3fl960-ripon-chandra-sahas-projects.vercel.app',
                     withCredentials: true
                 }); */

                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Added to Cart!',
                            text: `${food.name} has been added to your cart.`,
                            timer: 1500
                        });
                        refetch();
                    }
                })
            /*  */
        } else {

            Swal.fire({
                title: "Please log in to add to cart",
                text: "You need to log in to continue",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login now"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img src={image} alt={name} />
            </figure>
            <p className="absolute right-0 px-4 bg-red-500 text-white">${price}</p>
            <div className="card-body text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button
                        onClick={() => handleAddToCart(item)}
                        className="btn btn-warning"
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
