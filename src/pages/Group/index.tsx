import GroupList from "./GroupList"
import GroupDetail from "./GroupDetail"
import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const Group = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // const pathname = location.pathname;
        // if (pathname === "/web/group") {
        //     navigate("/web/group/list");
        // }
    }, [])
    return <Outlet />
}

export default Group;


export {
    Group, GroupList, GroupDetail
}