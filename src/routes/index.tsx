import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useRoutes,
    Outlet,
} from "react-router-dom";
import Home from "pages/Home";
import DevHome from "pages/DevHome";
import UIHome from "pages/DevHome/UIHome";
import TestSkill from "pages/DevHome/TestSkill";
import ErrorPage from "pages/ErrorPage";
import NotFoundPage from "pages/ErrorPage/NotFoundPage";
import Login from "pages/Login";
import Setting from "pages/Setting";
import Zone from "pages/Zone";
import { Group, GroupList, GroupDetail } from "pages/Group";
import SimpleList from "modules/index";
import SimpleA from "modules/SimpleA";
import SimpleB from "modules/SimpleB";
import SimpleC from "modules/SimpleC";
import { atomRoutes } from "models/index";
import { useSetRecoilState } from "recoil";
import { CommonFrameContainer } from "modules/Layout";
const TopRouter = () => {
    const webRoutes = [
        {
            path: "",
            element: (
                <CommonFrameContainer>
                    <Outlet />
                </CommonFrameContainer>
            ),
            children: [
                {
                    // path: "/",
                    index: true,
                    element: <Navigate to="/web/home" />,
                },
                {
                    path: "home",
                    name: "首页",
                    element: <Home />,
                },
                {
                    path: "login",
                    name: "登陆",
                    element: <Login mode="login" />,
                },
                {
                    path: "setting",
                    name: "设置",
                    element: <Setting mode="setting" />,
                },
                {
                    path: "newpassword",
                    name: "修改密码",
                    element: <Setting mode="newpwd" />,
                },
                {
                    path: "register",
                    name: "注册",
                    element: <Login mode="register" />,
                },
                {
                    path: "zone/:nameplate",
                    name: "空间",
                    element: <Zone />,
                },
                {
                    path: "group",
                    name: "部落",
                    element: <Group />,
                    children: [
                        {
                            path: "list",
                            name: "部落列表",
                            element: <GroupList />,
                        },
                        {
                            path: ":groupId",
                            name: "部落详情",
                            element: <GroupDetail />,
                        },
                    ],
                },
                {
                    path: "dev",
                    name: "开发者",
                    element: <DevHome />,
                    children: [
                        {
                            path: "ui",
                            name: "ui组件展示",
                            element: <UIHome />,
                        },
                        {
                            path: "test_skill",
                            name: "功能组件展示",
                            element: <TestSkill />,
                        },
                    ],
                },
                {
                    path: "modules",
                    name: "模块样板",
                    element: <SimpleList />,
                    children: [
                        {
                            path: "simple_a",
                            name: "样板a",
                            element: <SimpleA />,
                        },
                        {
                            path: "simple_b",
                            name: "样板b",
                            element: <SimpleB />,
                        },
                        {
                            path: "simple_c",
                            name: "样板c",
                            element: <SimpleC />,
                        },
                    ],
                },
                {
                    path: "error",
                    name: "错误中心",
                    element: <ErrorPage />,
                    children: [
                        {
                            path: "404",
                            name: "404",
                            element: <NotFoundPage />,
                        },
                    ],
                },
                {
                    path: "*",
                    element: <Navigate to="/web/error?code=404" />,
                },
            ],
        },
    ];

    const routes = [{
        path: "/",
        element: (
            <CommonFrameContainer>
                <Outlet />
            </CommonFrameContainer>
        ),
        children: [
            {
                path: "/", // 次级路由的话，path: "/", path: "", index:true 这三种表示都可以
                element: <Navigate to="/web/home" replace={true} />, // 根路由重定向到 /web/home
            },
            {
                path: "/web",// 打包问题，子路由写绝对别写相对
                children: [
                    {
                        path: "",// 但是这里只能 path: "" 或 index:true 这三种表示都可以
                        element: <Navigate to="/web/home" />,
                    },
                    {
                        path: "/web/home",
                        name: "首页",
                        element: <Home />,
                    },
                    {
                        path: "/web/login",
                        name: "登陆",
                        element: <Login mode="login" />,
                    },
                    {
                        path: "/web/setting",
                        name: "设置",
                        element: <Setting mode="setting" />,
                    },
                    {
                        path: "/web/newpassword",
                        name: "修改密码",
                        element: <Setting mode="newpwd" />,
                    },
                    {
                        path: "/web/register",
                        name: "注册",
                        element: <Login mode="register" />,
                    },
                    {
                        path: "/web/zone/:nameplate",
                        name: "空间",
                        element: <Zone />,
                    },
                    {
                        path: "/web/group",
                        name: "部落",
                        element: <Group />,
                        children: [
                            {
                                path: "",
                                element: <Navigate to="/web/group/list" />,
                            },
                            {
                                path: "/web/group/list",
                                name: "部落列表",
                                element: <GroupList />,
                            },
                            {
                                path: "/web/group/:groupId",
                                name: "部落详情",
                                element: <GroupDetail />,
                            },
                        ],
                    },
                    {
                        path: "/web/dev",
                        name: "开发者",
                        element: <DevHome />,
                        children: [
                            {
                                path: "",
                                element: <Navigate to="/web/dev/test_skill" />,
                            },
                            {
                                path: "/web/dev/ui",
                                name: "ui组件展示",
                                element: <UIHome />,
                            },
                            {
                                path: "/web/dev/test_skill",
                                name: "功能组件展示",
                                element: <TestSkill />,
                            },
                        ],
                    },
                    {
                        path: "/web/modules",
                        name: "模块样板",
                        element: <SimpleList />,
                        children: [
                            {
                                path: "/web/modules/simple_a",
                                name: "样板a",
                                element: <SimpleA />,
                            },
                            {
                                path: "/web/modules/simple_b",
                                name: "样板b",
                                element: <SimpleB />,
                            },
                            {
                                path: "/web/modules/simple_c",
                                name: "样板c",
                                element: <SimpleC />,
                            },
                        ],
                    },
                    {
                        path: "/web/error",
                        name: "错误中心",
                        element: <ErrorPage />,
                        children: [
                            {
                                path: "/web/error/404",
                                name: "404",
                                element: <NotFoundPage />,
                            },
                        ],
                    },
                ],

            },
            {
                path: "*",
                element: <Navigate to="/web/error?code=404" />,
            },
        ],
    }
    ]
    const routeList = useRoutes(routes);
    const setAtomRoutes = useSetRecoilState(atomRoutes);
    useEffect(() => {
        setAtomRoutes(routes);
    }, []);
    return routeList;
};
export default TopRouter;
