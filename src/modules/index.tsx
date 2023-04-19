import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
const SimpleList = () => {
    return (
        <div className="bg-blue-200 h-screen">
            <Link to="SimpleA">SimpleA</Link>
            <Link to="SimpleB">SimpleB</Link>
            <Link to="SimpleC">SimpleC</Link>
            <h3>展示不同的Simple模板</h3>
            <Outlet />
        </div>
    );
};

export default SimpleList;
