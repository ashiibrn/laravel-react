import { useStateContext } from "../contexts/contextprovider";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestLayout() {
    // Get token from context
    const { token } = useStateContext();

    // If user is authenticated (i.e., token exists), redirect to home page
    if (token) {
        return <Navigate to="/" />;
    }

    // If user is not authenticated, render child routes
    return (
        <div>
            {/* The Outlet renders child routes */}
            <Outlet />
        </div>
    );
}
