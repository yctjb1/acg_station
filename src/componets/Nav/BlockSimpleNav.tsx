import React, { useEffect, useState, useMemo } from "react";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { atomRoutes } from "models/index";
import { useRecoilValue } from "recoil";
type Itheme = "dark0" | "light0";
interface IBlockSimpleNavItem {
    label: string;
    url: string;
}
/** activeKey 用法1: 关键词 pathName 激活匹配当前路径的样式(高优先)
 *            用法2: 而其他参数不为空的情况时 双绑入参
 */
interface IBlockSimpleNav {
    dataSource: IBlockSimpleNavItem[];
    config?: {
        theme?: Itheme;
        activeKey?: "pathName" | string;
        activeTypeStyle?: "underline"; // underline模式的activeColor只影响underline
        activeColor?: "border-red-500";
        hoverColor?: "group-hover:border-red-500";
    };
}
enum ThemeColor {
    dark0 = "text-white",
    light0 = "text-black",
}
enum ThemeBg {
    dark0 = "bg-black",
    light0 = "bg-white",
}

const BlockSimpleNav = (props: IBlockSimpleNav) => {
    const { dataSource = [], config } = props;
    const {
        theme = "dark0",
        activeKey: configActiveKey = "",
        activeTypeStyle = "underline",
        activeColor = "border-red-500",
        hoverColor = "group-hover:border-red-500",
    } = config || {};
    const themeColor = ThemeColor[theme];
    const themeBg = ThemeBg[theme];
    const location: any = useLocation();
    const pathname = location?.pathname || "";

    const spanContentCss = useMemo(() => {
        switch (activeTypeStyle) {
            case "underline":
                return activeColor;
            default:
                return activeColor;
        }
    }, [activeTypeStyle, activeColor]);
    const atomRoutesState = useRecoilValue(atomRoutes);
    const activeCss = (item: IBlockSimpleNavItem) => {
        if (configActiveKey === "pathName" && pathname.startsWith(item.url)) {
            return spanContentCss;
        }

        return `border-transparent ${hoverColor}`;
    };
    const groupRedHover = "group-hover:border-red-500";
    const groupHover = spanContentCss === "border-red-500" ? groupRedHover : "group-hover:border-blue-500";

    return (
        <div className="z-50 px-4 bg-black acg_block_bg_simple_nav">
            <div className="container">
                <nav
                    className={`flex items-center text-sm text-center font-medium ${themeBg} ${themeColor}`}
                >
                    {dataSource.map(
                        (item: IBlockSimpleNavItem, index: number) => (
                            <div
                                className="flex px-3 border-0 border-t-2 border-solid border-transparent"
                                key={index}
                            >
                                <a
                                    href={item.url}
                                    className="group cursor-pointer"
                                >
                                    <span
                                        className={`inline-block py-2 border-0 border-b-2 border-solid ${themeColor} ${activeCss(
                                            item
                                        )} ${groupHover} `}
                                        dangerouslySetInnerHTML={{
                                            __html: item.label,
                                        }}
                                    ></span>
                                </a>
                            </div>
                        )
                    )}
                </nav>
            </div>
        </div>
    );
};

export default BlockSimpleNav;
