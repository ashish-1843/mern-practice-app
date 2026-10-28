import { createBrowserRouter } from 'react-router';
import Register from './features/auth/pages/Register';
import Login from './features/auth/pages/Login';
import Protected from './features/auth/components/Protected';
import Dashboard from './features/Dashboard/pages/Dashboard';
import VerifyEmail from './features/auth/components/VerifyEmail';
import Navbar from './features/Dashboard/components/Navbar';
import CreateToDo from './features/Dashboard/components/CreateToDo';
import ForgotPassEmail from './features/auth/components/ForgotPassEmail';
import ResetPass from './features/auth/components/ResetPass';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/dashboard',
        element: <Protected><Navbar/><Dashboard/></Protected>
    },
    {
        path: '/verify-email',
        element: <VerifyEmail/>
    },
    {
        path: '/create-note',
        element: <Protected><Navbar/><CreateToDo/></Protected>
    },
    {
        path: '/forgot-password',
        element: <ForgotPassEmail/>
    },
    {
        path: '/reset-password',
        element: <Protected><ResetPass/></Protected>
    }
])