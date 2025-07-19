import {
    FaAdn,
    FaCalendarPlus,
    FaShopify,
    FaList,
    FaHouseChimneyWindow,
    FaSearchengin,
    FaUsers,
    FaUtensils,
    FaBook,
    FaFileContract
} from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";


const Dashboard = () => {
    const [cart] = useCart();
    const isAdmin = true; // TODO: Replace with real admin check in future

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 min-h-screen bg-orange-700 text-white">
                <ul className="menu p-4 space-y-2">

                    {/* Admin Routes */}
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/home">
                                    <FaHouseChimneyWindow className="inline-block mr-2" />
                                    Admin Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/items">
                                    <FaUtensils className="inline-block mr-2" />
                                    Add Items
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/items">
                                    <FaList className="inline-block mr-2" />
                                    Manage Items
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaBook className="inline-block mr-2" />
                                    Manage Bookings
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers className="inline-block mr-2" />
                                    All Users
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        // User Routes
                        <>
                            <li>
                                <NavLink to="/dashboard/">
                                    <FaHouseChimneyWindow className="inline-block mr-2" />
                                    User Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/reservation">
                                    <FaCalendarPlus className="inline-block mr-2" />
                                    Reservation
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/cart">
                                    <FaShopify className="inline-block mr-2" />
                                    My Cart ({cart.length} )
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/review">
                                    <FaAdn className="inline-block mr-2" />
                                    Review
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaList className="inline-block mr-2" />
                                    Bookings
                                </NavLink>
                            </li>
                        </>
                    )}

                    <div className="divider"></div>

                    {/* Common Links */}
                    <li>
                        <NavLink to="/">
                            <FaHouseChimneyWindow className="inline-block mr-2" />
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/order/salad">
                            <FaSearchengin className="inline-block mr-2" />
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contract">
                            <FaFileContract className="inline-block mr-2" />
                            Contract
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Page Content */}
            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
