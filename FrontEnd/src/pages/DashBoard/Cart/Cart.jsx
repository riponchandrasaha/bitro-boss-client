import useCart from "../../../Hooks/useCart";
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2'
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
const Cart = () => {
    const [cart, refetch] = useCart();


    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }

                    })
            }
        });
    }

    return (
        <div>
            <div className=" flex justify-evenly">
                <h3 className="text-3xl">Items : {cart.length}</h3>
                <h3 className="text-3xl">Total Price : {totalPrice}</h3>
                <button className="btn btn-primary w-3/12">Pay</button>
            </div>


            <div className="overflow-x-auto ">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                S/N
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.image}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>

                                    {item.name}
                                </td>
                                <td>BDT {item.price}</td>
                                <th>

                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-xl text-red-600"><FaTrashAlt></FaTrashAlt></button>
                                </th>
                            </tr>)
                        }
                        {/* row 1 */}




                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Cart;