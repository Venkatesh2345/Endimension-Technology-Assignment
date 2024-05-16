import App from "./App";
import * as React from "react";
import {
    createBrowserRouter,
} from "react-router-dom";
import AddPage from "./components/AddPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/addProduct",
        element: <AddPage/>,
    },
]);

export default router