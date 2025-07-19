import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../SocialLogin/SocialLogin';
import FacebookLogin from '../SocialLogin/FacebookLogin';



const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    console.log('state location',location.state)

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const captcha = form.captcha.value.trim();

        if (!validateCaptcha(captcha)) {
            Swal.fire({
                icon: 'error',
                title: 'Captcha incorrect',
                text: 'Please try again!',
            });
            return;
        }

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "Login Successful!",
                    text: `Welcome, ${user.email}`,
                    icon: "success"
                }).then(() => {
                    navigate(from, { replace: true }); // ✅ Redirect after login
                });
            })
            .catch(error => {
                Swal.fire({
                    title: "Login Failed!",
                    text: error.message,
                    icon: "error"
                });
            });
    };

    const handleCaptchaBlur = (e) => {
        const value = e.target.value.trim();
        setDisabled(!validateCaptcha(value)); // Just enable/disable the button
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Enter your credentials and the captcha to log in.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <fieldset className="space-y-3">
                            <label className="label">Email</label>
                            <input type="email" name="email" className="input input-bordered w-full" placeholder="Email" required />

                            <label className="label">Password</label>
                            <input type="password" name="password" className="input input-bordered w-full" placeholder="Password" required />

                            <label className="label">Captcha</label>
                            <LoadCanvasTemplate />

                            <input
                                type="text"
                                name="captcha"
                                onBlur={handleCaptchaBlur}
                                className="input input-bordered w-full"
                                placeholder="Type the text above"
                                required
                            />

                            <input
                                disabled={disabled}
                                className="btn btn-neutral mt-4"
                                type="submit"
                                value="Login"
                            />
                        </fieldset>
                    </form>
                     {/* ✅ Add social login below */}
                    <div className="px-8 pb-4 flex justify-between">
                        <SocialLogin />
                        <FacebookLogin/>
                    </div>
                    
                    <p className="text-center mb-4">
                        <small>New here? <Link to="/signup" className="link link-hover">Create an account</Link></small>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
