import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { RiFileAddLine } from "react-icons/ri";

import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from '../../assets/task-management.png'
import Theme from "../../components/Theme";


const Navbar = () => {
    const { user, loginWithGoogle, logOutUser } = useContext(AuthContext)
    const handleLogOut = () => {
        logOutUser()
            .then(res => {

            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="navbar z-10 fixed py-4 bg-opacity-70 px-16   bg-green-500">
            <div className="flex-1">
                <Link to={"/"} className="flex gap-2 items-center font-bold text-xl">
                    <img className="h-10 w-10" src={logo} alt="" />
                    FileUp</Link>
            </div>
            <div className="flex-none gap-4 items-center">
                
                <div className="mx-2">
                    <Theme></Theme>
                </div>
                <div className="dropdown dropdown-end">
                    {
                        user ?
                            <div>
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            referrerPolicy="no-referrer"
                                            src={user?.photoURL}
                                            alt="User Image"
                                        />


                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <div className="px-4 mb-4 opacity-70">
                                        {user?.displayName} <br />
                                        {user?.email}
                                    </div>

                                    <li><button onClick={handleLogOut}>Logout</button></li>
                                </ul>
                            </div> : <div>
                                <Link to={"/login"}><button className="flex gap-2 btn"> Login</button></Link>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;