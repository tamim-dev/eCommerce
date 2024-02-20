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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/pages/home/Home";
import UserList from "./components/pages/home/UserList";
import Viewcategory from "./components/pages/home/Viewcategory";
import Addcategory from "./components/pages/home/Addcategory";
import Addsubcategory from "./components/pages/home/Addsubcategory";
import Viewsubcategory from "./components/pages/home/Viewsubcategory";
import Viewproduct from "./components/pages/home/Viewproduct";
import Addproduct from "./components/pages/home/Addproduct";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Registration />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/otp/:email" element={<Otp />}></Route>
            <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
            <Route
                path="/changepassword/:token"
                element={<Changepassword />}
            ></Route>
            <Route path="/dashboard" element={<Home />}>
                <Route path="userlist" element={<UserList />}></Route>
                <Route path="viewcategory" element={<Viewcategory />}></Route>
                <Route path="addcategory" element={<Addcategory />}></Route>
                <Route
                    path="addsubcategory"
                    element={<Addsubcategory />}
                ></Route>
                <Route
                    path="viewsubcategory"
                    element={<Viewsubcategory />}
                ></Route>
                <Route path="viewproduct" element={<Viewproduct />}></Route>
                <Route path="addproduct" element={<Addproduct />}></Route>
            </Route>
        </Route>
    )
);

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Flip
            />
        </>
    );
}

export default App;
