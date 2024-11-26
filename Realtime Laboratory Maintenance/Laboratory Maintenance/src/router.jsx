// router.js
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import ProtectedLayout from './Components/ProtectedLayout.jsx';
import { UserRoutes } from './views/user/router.jsx';
import { TechRoutes } from './views/tech/router_tech.jsx';
import { AdminRoutes } from './views/admin/router_admin.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/User/homepage" />,  // Default redirect for logged-in users
      },
      {
        path: 'User/*',
        element: <UserRoutes />,
      },
      {
        path: '/',
        element: <Navigate to="/Tech/homepage_tech" />,  // Default redirect for logged-in users
      },
      {
        path: 'Tech/*',
        element: <TechRoutes />,
      },
      {
        path: '/',
        element: <Navigate to="/Admin/homepage" />,  // Default redirect for logged-in users
      },
      {
        path: 'Admin/*',
        element: <AdminRoutes />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
  }
  
]);

export default router;
