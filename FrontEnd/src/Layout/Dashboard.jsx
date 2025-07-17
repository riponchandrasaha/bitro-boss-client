import {
    FaAdn,
    FaCalendarPlus,
    FaShopify,
    FaList,
    FaHouseChimneyWindow,
    FaSearchengin
} from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 min-h-screen bg-orange-700 text-white">
                <ul className="menu p-4 space-y-2">

                    {/* User Options */}
                    <li>
                        <NavLink to="/dashboard/reservation">
                            <FaCalendarPlus className="inline-block mr-2" />
                            Reservation
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/cart">
                            <FaShopify className="inline-block mr-2" />
                            My Cart
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

                    <div className="divider"></div>

                    {/* Home Link */}
                    <li>
                        <NavLink to="/">
                            <FaHouseChimneyWindow className="inline-block mr-2" />
                            User Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaSearchengin className="inline-block mr-2" />
                            Menu
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
