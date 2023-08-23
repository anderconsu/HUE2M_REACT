import { createBrowserRouter } from "react-router-dom";
import Root from "./root.jsx";
import ErrorPage from "./error";
import App from "../App.js"

import Landing from "../components/main/landing.jsx";
import Register from "../components/credentials/register.jsx";
import EmailRegister from "../components/credentials/emailRegister.jsx";
import Login from "../components/credentials/login.jsx";
import EmailLogin from "../components/credentials/emailLogin.jsx";
import Form from "../components/main/form.jsx";
import ProfileCreate from "../components/user/profilecreate.jsx";

const Router = createBrowserRouter([
    {
        path: "/",
        element:<Root />, 
        errorElement: <ErrorPage />,
        children: [
            {
                path:"/",
                element: <Landing />
            },
            {
                path:"/register",
                element: <Register /> 
            }, 
            {
                path:"/login/email",
                element: <EmailLogin/>
            },
            {
                path:"/login",
                element: <Login />
            },
            {
                path:"/register/email",
                element: <EmailRegister/>
            },
            {
                path:"/form",
                element: <Form/>
            },
            {
                path:"/profile",
                element:<ProfileCreate/> 
            }

        ]         
    }
]);

export default Router;