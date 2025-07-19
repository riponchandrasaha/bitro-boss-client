import { FaFacebook } from "react-icons/fa6";
import useAuth from "../../Hooks/useAuth";


const FacebookLogin = () => {
    const { FBSignIn } = useAuth();

    const handleFBSignIn = () => {
        FBSignIn()
            .then(result => {
                console.log(result.user);
            })
    }
    return (
        <div>
            <div className=" "></div>
            <div>
                <button onClick={handleFBSignIn} className="btn btn-accent">
                    <FaFacebook className=" mr-3"></FaFacebook>
                    Facebook
                </button>
            </div>
        </div>
    );
};

export default FacebookLogin ;