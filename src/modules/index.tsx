import React from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";

import { Button, ButtonGroup } from "@mui/material";

interface IUrlInfoItem {
    url: string;
    label: string;
}

const SimpleList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActiveCss = (item: IUrlInfoItem) => {
        return item.url === location.pathname.replace("/modules/", "");
    };

    const urlInfoList: IUrlInfoItem[] = [
        { url: "simple_a", label: "SimpleA" },
        { url: "simple_b", label: "SimpleB" },
        { url: "simple_c", label: "SimpleC" },
    ];
    return (
        <div>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                {urlInfoList.map((item: IUrlInfoItem, index: number) => (
                    <Button
                        onClick={() => navigate(item.url)}
                        className={`border-indigo-600 ${
                            isActiveCss(item)
                                ? "bg-indigo-600 text-white"
                                : "bg-transparent text-indigo-600 hover:bg-indigo-100"
                        }`}
                        key={item.url}
                    >
                        {item.label}
                    </Button>
                ))}
            </ButtonGroup>
            {location.pathname === "/modules" && <h3>展示不同的Simple模板</h3>}
            <Outlet />
        </div>
    );
};

export default SimpleList;
