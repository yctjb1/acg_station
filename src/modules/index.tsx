import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { SimplePageFrame } from "modules/Layout"
const SimpleList = () => {
    return (
        <SimplePageFrame>
            <Link to="simple_a">SimpleA</Link>
            <Link to="simple_b">SimpleB</Link>
            <Link to="simple_c">SimpleC</Link>
            <h3>展示不同的Simple模板</h3>
            <Outlet />
        </SimplePageFrame>
    );
};

export default SimpleList;
