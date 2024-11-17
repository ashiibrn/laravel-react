import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import Users from './views/users.jsx';
import UserForm from './views/UserForm.jsx';
import Homepage from './views/user/homepage.jsx';
import DragAndDrop from './DragAndDrop.jsx';
import Tabs from './tabs.jsx';
import Health from './views/user/health.jsx'
import ProtectedLayout from './Components/ProtectedLayout.jsx';
import Lab1_Tech from './views/tech/health/Lab1_Tech.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedLayout />,
        children: [
            // Student-specific routes under DefaultLayout
            {
                path: '/',
                element: <Homepage />,
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            },
            {
                path: '/Health',
                element: <Health />
            },
            // Faculty-specific routes under TechLayout
            {
                path: '/DragAndDrop',
                element: <DragAndDrop />
            },
            {
                path: '/Lab1_Tech',
                element: <Lab1_Tech />
            }
        ]
    },
    // Guest routes for login and registration
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    }
]);

export default router;
