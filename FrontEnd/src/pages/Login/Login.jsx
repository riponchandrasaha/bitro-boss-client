import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
const Login = () => {
    const captchaRef = useRef(null);

    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
    }

    const handleValidateChapcha = () => {

        const user_captcha_value = captchaRef.current.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }
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
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" name="email" placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" name="password" placeholder="Password" />

                            <div><a className="link link-hover">Forgot password?</a></div>
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input type="captcha" ref={captchaRef} name="captcha" placeholder="type the text avobe" />
                            <button onClick={handleValidateChapcha} className='btn btn-outline btn-xs mt-3'>validate</button>
                            <input disabled={disabled} className="btn btn-neutral mt-4" type="submit" value="Login" />
                        </fieldset>
                        <fieldset className="fieldset">



                        </fieldset>

                    </form>
                    <p><small>New here? <Link to="/signup">Create an account</Link></small></p>
                </div>
            </div>
        </div>
    );
};

export default Login;