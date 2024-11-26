import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/contextprovider.jsx';
import DefaultLayout from '../Components/DefaultLayout.jsx';
import TechLayout from '../Components/TechLayout.jsx';
import AdminLayouts from '../Components/AdminLayout.jsx';

const ProtectedLayout = () => {
    const { token, position } = useStateContext();

    // Redirect to login if no token
    if (!token) {
        return <Navigate to='/login' />;
    }

    // Show a loader while position is being determined
    if (position === null) {
        return (
            <div className="loading-spinner">
                <div className="spinner">Loading...</div>
            </div>
        );
    }

    // Render layouts based on user position
    if (position === 'faculty') {
        return (
            <DefaultLayout>
                <Outlet />
            </DefaultLayout>
        );
    }

    if (position === 'technician') {
        return (
            <TechLayout>
                <Outlet />
            </TechLayout>
        );
    }

    if (position === 'admin') {
        return (
            <AdminLayouts>
                <Outlet />
            </AdminLayouts>
        );
    }

    // Redirect if position doesn't match expected roles
    return <Navigate to='/login' />;
};

export default ProtectedLayout;
