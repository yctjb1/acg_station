import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useRoutes,
} from "react-router-dom";
import Home from "pages/Home";
import DevHome from "pages/DevHome";
import UIHome from "pages/DevHome/UIHome";
import TestSkill from "pages/DevHome/TestSkill";
import ErrorPage from "pages/ErrorPage";
import NotFoundPage from "pages/ErrorPage/NotFoundPage";
import SimpleList from "modules/index";
import SimpleA from "modules/SimpleA";
import SimpleB from "modules/SimpleB";
import SimpleC from "modules/SimpleC";
import { atomRoutes } from "models/index";
import { useSetRecoilState } from "recoil";

const TopRouter = () => {
    const routes = [
        {
            path: "/",
            element: <Navigate to="/home" />,
        },
        {
            path: "/home",
            name: "首页",
            element: <Home />,
        },
        {
            path: "/dev",
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
            path: "/modules",
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
            path: "/error",
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
            element: <Navigate to="/error?code=404" />,
        },
    ];
    const routeList = useRoutes(routes);
    const setAtomRoutes = useSetRecoilState(atomRoutes);
    useEffect(() => {
        setAtomRoutes(routes);
    }, []);
    return routeList;
};
export default TopRouter;
