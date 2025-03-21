import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Routes/AuthProvider";
import { toast } from "react-toastify";
import { Tooltip as ReactTooltip } from 'react-tooltip'

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => {
                return toast.success('User Logout successfully');
            }).catch((error) => {
                return toast.error(error.message);
            });
    }

    const navLinks = <>
        <li><NavLink to={'/'} className={({ isActive }) => isActive === true ? 'text-purple-700 font-bold' : 'font-semibold'}>Home</NavLink></li>
        <li><NavLink to={'/userProfile'} className={({ isActive }) => isActive === true ? 'text-purple-700 font-bold' : 'font-semibold'}>User Profile</NavLink></li>
        <li><NavLink to={'/updateProfile'} className={({ isActive }) => isActive === true ? 'text-purple-700 font-bold' : 'font-semibold'}>Update Profile</NavLink></li>
    </>

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Jj Commercial</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="avatar mr-3">
                    <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2 z-20">
                        <img data-tooltip-id="my-tooltip" data-tooltip-content={user?.email} alt="photo url is not right" src={user ? user?.photoURL
                            : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                        <ReactTooltip id="my-tooltip" />
                    </div>
                </div>
                {
                    user ?
                        <button onClick={handleLogout} className="btn btn-error text-white">Logout</button> :
                        <Link to={'/login'}><button className="btn btn-success">Login</button></Link>
                }
            </div>
        </div>
    );
};

export default Navbar;