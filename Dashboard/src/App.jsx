import { useState } from "react";
import "./App.css";
import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
} from "react-router-dom";
import Registration from "./components/pages/Registration";
import Login from "./components/pages/Login";
import Otp from "./components/pages/Otp";
import Forgotpassword from "./components/pages/Forgotpassword";
import Changepassword from "./components/pages/Changepassword";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Registration />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/otp/:email" element={<Otp />}></Route>
            <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
            <Route
                path="/changepassword/:email"
                element={<Changepassword />}
            ></Route>
        </Route>
    )
);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
