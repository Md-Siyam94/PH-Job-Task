import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { FadeLoader } from "react-spinners";
import { Navigate, useLocation } from "react-router-dom";


const PrivetRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
        return <div className="flex flex-col h-full my-56 items-center ">
            <FadeLoader color="#ff7a92" />
        </div>
    }
    if(user){
        return children;
    }

    return (
        <Navigate state={location.pathname} to={"/login"}></Navigate>
    );
};

export default PrivetRoute;