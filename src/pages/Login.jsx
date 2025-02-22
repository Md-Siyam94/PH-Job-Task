import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
    const { loginWithGoogle } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = () => {
        loginWithGoogle()
            .then(result => {
                console.log("from google log", result?.user?.displayName);
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                    image: result?.user?.photoURL,
                }
                axios.post(`${import.meta.env.VITE_baseURL}/users`, userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate("/")
                    })
                    .catch(err => {
                        console.log(err);
                    })
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
                        This page is only available for registered users. Please log in to proceed.
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