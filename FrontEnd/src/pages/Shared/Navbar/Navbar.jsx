import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaCartPlus } from "react-icons/fa6";
import useCart from "../../../Hooks/useCart";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
const [cart] = useCart();
  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error));
  };

  const NavOption = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/menu">Our Menu</Link></li>
      <li><Link to="/order/salad">Order Foods</Link></li>
      <li><Link to="/secret">Secret</Link></li>
      <li>
        <Link to="dashboard/cart">
          <button className="btn btn-ghost">
            <FaCartPlus />
            <div className="badge badge-sm badge-secondary ">+0{cart.length}</div>
          </button>
        </Link>
      </li>
      {
        user ? (
          <>
            <li>
              <button onClick={handleLogOut} className="btn btn-soft btn-accent">Logout</button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )
      }
    </>
  );

  return (
    <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {NavOption}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">Bistro BOSS</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {NavOption}
        </ul>
      </div>

      <div className="navbar-end">
        {user && user.displayName && (
          <span className="mr-2 font-semibold hidden lg:inline">Hi, {user.displayName}</span>
        )}
        <a className="btn">Get Started</a>
      </div>
    </div>
  );
};

export default Navbar;
