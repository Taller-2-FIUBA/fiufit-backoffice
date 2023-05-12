import {Outlet, Navigate } from "react-router-dom";
import { getToken } from "./api/utils/localStorageUtils";

const PrivateRoutes = () => {
    const token = getToken();
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    );       
}

export default PrivateRoutes;