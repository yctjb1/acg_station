import React, { useEffect, useState, useMemo } from "react";
import qs from "qs";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { pageErrorCode } from "models/index"
const ErrorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchObj = qs.parse(location.search, { ignoreQueryPrefix: true });
    const [errorCode, setErrorCode] = useRecoilState<number | string>(pageErrorCode);
    useEffect(() => {
        if (searchObj) {
            const urlCode = Number(searchObj?.code);
            if (!isNaN(urlCode)) {
                setErrorCode("" + urlCode);
            } else {
                const pathname = location.pathname;
                const arr = pathname.split("/").filter((item) => item);
                if (arr[0] === "error" && arr[1]) {
                    setErrorCode(arr[1]);
                }
            }
        }
    }, []);
    useEffect(() => {
        if (errorCode) {
            if (errorCode === "404") {
                handleRedirect();
            }
        }
    }, [errorCode]);
    const handleRedirect = (url = "404") => {
        navigate(url);
    };
    return (
        <div>
            {!errorCode ? "这里是错误页面根路由" : null}
            <Outlet />
        </div>
    );
};
export default ErrorPage;
