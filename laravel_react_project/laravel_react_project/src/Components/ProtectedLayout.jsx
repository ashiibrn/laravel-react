import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/contextprovider.jsx';
import DefaultLayout from '../Components/DefaultLayout.jsx';
import TechLayout from '../Components/TechLayout.jsx';

const ProtectedLayout = ({ children }) => {


    const { position } = useStateContext();
    const { token } = useStateContext();

    if(!token){
        return <Navigate to='/login'/>
    }
    

    if (position === null) {
        return <div>Loading...</div>; // Or some fallback
    }

    if (position === "student") {
        return <DefaultLayout><Outlet /></DefaultLayout>;
    } else if (position === "faculty") {
        return <TechLayout><Outlet /></TechLayout>;
    }
    return null; // Or handle cases where position isn't defined yet
};

export default ProtectedLayout;