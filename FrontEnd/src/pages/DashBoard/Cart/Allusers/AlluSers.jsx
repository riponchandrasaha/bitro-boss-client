import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import Swal from "sweetalert2";

const AlluSers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

   /*  const handleMakeAdmin = user =>{
        
    } */

    const handleDeleteUser = user => {
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

                axiosSecure.delete(`/users/${user._id}`)
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
            <div className=" flex justify-evenly my-4">
                <h2 className=" text-3xl"> All Users</h2>
                <h2 className=" text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>

                        <tr>
                            <th></th>
                            <th className="">Name</th>
                            <th>Email</th>
                            <th>Roll</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td className="text-green-600 text-2xl text-shadow-blue-600 ">{user.name}</td>
                                <td>{user.email}</td>
                                <td>


                                    <button
                                        onClick={() => /* handleMakeAdmin */handleDeleteUser(user)}
                                        className="btn btn-dash btn-lg bg-orange-500 text-2xl text-green-600">
                                        <FaUserCheck></FaUserCheck>
                                    </button>



                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="btn btn-ghost btn-xl text-red-600">
                                        <FaTrashAlt></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            {/* <div className=" rotate-90 pt-50">
                <div className="mockup-phone border-primary">
                    <div className="mockup-phone-camera"></div>
                    <div className="mockup-phone-display rotate-180">
                        <img alt="wallpaper" src="https://img.daisyui.com/images/stock/453966.webp" />
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default AlluSers;