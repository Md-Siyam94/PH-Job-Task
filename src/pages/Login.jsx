import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const {loginWithGoogle} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = () => {
        loginWithGoogle()
            .then(result => {
                // console.log("from google log", result);
                navigate("/")
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="lg:flex gap-20 lg:p-16 items-center flex-col lg:flex-row-reverse">
                <div className="text-center  lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="">
                    <button onClick={handleLogin} className="flex gap-2 btn w-72 bg-base-100 border shadow-md shadow-green-200"><FcGoogle className="text-2xl" /> Login With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;