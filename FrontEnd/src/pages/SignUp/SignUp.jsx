import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider.jsx";
import Swal from "sweetalert2";

const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { createUser } = useContext(AuthContext);

    const onSubmit = (data) => {
        console.log("Form data:", data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log("Created user:", loggedUser);
                Swal.fire({
                    icon: 'success',
                    title: 'Account Created!',
                    text: `Welcome ${data.name || 'User'}!`,
                });
            })
            .catch(error => {
                console.error("Signup error:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Signup Failed',
                    text: error.message,
                });
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <p className="py-6">Create your account to access awesome features.</p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <fieldset className="fieldset space-y-3">
                            <label className="label">Name</label>
                            <input type="text" {...register("name", { required: true })} placeholder="Your name" className="input input-bordered w-full" />
                            {errors.name && <span className="text-red-500">Name is required</span>}

                            <label className="label">Email</label>
                            <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered w-full" />
                            {errors.email && <span className="text-red-500">Email is required</span>}

                            <label className="label">Password</label>
                            <input type="password" {...register("password", { required: true })} placeholder="Password" className="input input-bordered w-full" />
                            {errors.password && <span className="text-red-500">Password is required</span>}

                            <div>
                                <a className="link link-hover">Forgot password?</a>
                            </div>
                            <div>
                                <Link to="/login" className="link link-hover">Already have an account? Login</Link>
                            </div>

                            <button type="submit" className="btn btn-neutral mt-4">Sign Up</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
