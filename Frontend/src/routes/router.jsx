import { createBrowserRouter } from "react-router-dom";
import Root from "./root.jsx";
import ErrorPage from "./error";
import App from "../App.js"

import Landing from "../components/main/landing.jsx";
import Register from "../components/credentials/register.jsx";
import Login from "../components/credentials/login.jsx";
import Form from "../components/main/form.jsx";

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
                path:"/login",
                element: <Login />
            }

        ]         
    }
]);

export default Router;