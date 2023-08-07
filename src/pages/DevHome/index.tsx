import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SplitButton } from "componets/Button";
const DevHome = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const pathname = location.pathname;
        // if (pathname === "/web/dev") {
        //     navigate("ui");
        // }
    }, [])
    return <div>
        <SplitButton btnOptions={[
            {
                key: 1,
                label: "测试小工具",
                href: "/web/dev/test_skill",
            },
            {
                key: 2,
                label: "部分ui组件的demo",
                href: "/web/dev/ui"
            },
        ]} />
        <Outlet />
    </div>
}

export default DevHome;