import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider.jsx";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic.jsx";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("Form data:", data);

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log("Created user:", loggedUser);

                return updateUserProfile({
                    displayName: data.name,
                    photoURL: data.photoURL
                });
            })
            .then(() => {
                const userInfo = {
                    name: data.name,
                    email: data.email
                };

                return axiosPublic.post('/users', userInfo);
            })
            .then(res => {
                if (res.data.insertedId) {
                    console.log("User added to DB");
                    Swal.fire({
                        icon: 'success',
                        title: 'Account Created!',
                        text: `Welcome ${data.name || 'User'}!`,
                    });
                    reset();
                    navigate('/');
                }
            })
            .catch(error => {
                console.error("Signup or Profile Update Error:", error);
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
                        <fieldset className="space-y-3">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                placeholder="Your name"
                                className="input input-bordered w-full"
                            />
                            {errors.name && <span className="text-red-500">{errors.name.message}</span>}

                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                placeholder="Email"
                                className="input input-bordered w-full"
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}

                            <label className="label">Photo URL</label>
                            <input
                                type="url"
                                {...register("photoURL", {
                                    required: "Photo URL is required",
                                    pattern: {
                                        value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))/i,
                                        message: "Enter a valid image URL"
                                    }
                                })}
                                placeholder="Photo URL"
                                className="input input-bordered w-full"
                            />
                            {errors.photoURL && <span className="text-red-500">{errors.photoURL.message}</span>}

                            <label className="label">Password</label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                placeholder="Password"
                                className="input input-bordered w-full"
                            />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                            <div>
                                <Link to="/forgot-password" className="link link-hover">Forgot password?</Link>
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
