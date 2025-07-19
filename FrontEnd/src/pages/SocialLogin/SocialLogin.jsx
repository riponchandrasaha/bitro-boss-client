import { FaGoogle } from "react-icons/fa6";
import useAuth from "../../Hooks/useAuth";


const SocialLogin = () => {
    const { googleSignIn } = useAuth();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
            })
    }
    return (
        <div>
            <div className=" "></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn btn-accent">
                    <FaGoogle className=" mr-3"></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;