import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SimplePageFrame } from "modules/Layout"
const DevHome = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        const pathname = location.pathname;
        if(pathname === "/dev"){
            navigate("ui");
        }
    }, [])
    return <SimplePageFrame>
        这里是开发相关路由，包含开发者笔记 、一些封装的组件demo展示
        <ul>
            <li><Link to="ui">ui的demo展示页</Link></li>
            <li><Link to="test_skill">测试功能页</Link></li>
        </ul>
        <h5>下面是功能展示区</h5>
        <div>
            <Outlet/>
        </div>
    </SimplePageFrame>
}

export default DevHome;