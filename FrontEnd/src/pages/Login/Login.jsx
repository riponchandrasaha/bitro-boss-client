import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    //const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);

    useEffect(() => {
        loadCaptchaEnginge(6); // Captcha length
    }, []);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "Login Successful!",
                    text: `Welcome, ${user.email}`,
                    icon: "success"
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

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value.trim();
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
            Swal.fire({
                icon: 'error',
                title: 'Captcha incorrect',
                text: 'Please try again!',
            });
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <fieldset className="fieldset space-y-3">
                            <label className="label">Email</label>
                            <input type="email" name="email" className="input input-bordered w-full" placeholder="Email" required />

                            <label className="label">Password</label>
                            <input type="password" name="password" className="input input-bordered w-full" placeholder="Password" required />

                            <div>
                                <label className="label">Captcha</label>
                                <LoadCanvasTemplate />
                            </div>

                            <input
                                type="text"
                                //ref={captchaRef}
                                onBlur={handleValidateCaptcha} //
                                name="captcha"
                                className="input input-bordered w-full"
                                placeholder="Type the text above"
                                required
                            />
                            {/* <button
                                type="button"

                                className='btn btn-outline btn-xs mt-3'
                            >
                                Validate
                            </button> */}

                            <input
                                disabled={disabled}
                                className="btn btn-neutral mt-4"
                                type="submit"
                                value="Login"
                            />
                        </fieldset>
                    </form>
                    <p className="text-center mb-4">
                        <small>New here? <Link to="/signup" className="link link-hover">Create an account</Link></small>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
