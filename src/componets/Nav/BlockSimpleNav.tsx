import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
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
    };
}
enum ThemeCss {
    dark0 = "text-white bg-black",
    light0 = "text-black bg-white",
}

const BlockSimpleNav = (props: IBlockSimpleNav) => {
    const { dataSource = [], config } = props;
    const { theme = "dark0", activeKey: configActiveKey = "" } = config || {};
    const themeCss = ThemeCss[theme];
    const location: any = useLocation();
    const pathname = location?.pathname || "";

    const activeCss = (item: IBlockSimpleNavItem) => {
        if (configActiveKey === "pathName" && pathname.startsWith(item.url)) {
            return "border-red-500";
        }
        return "border-transparent";
    };
    return (
        <div className="z-50 px-4 bg-black acg_block_bg_simple_nav">
            <div className="container mx-auto">
                <nav
                    className={`flex items-center text-sm font-medium ${themeCss}`}
                >
                    {dataSource.map(
                        (item: IBlockSimpleNavItem, index: number) => (
                            <div
                                className="group flex px-3 border-t-2 border-transparent -ml-3"
                                key={index}
                            >
                                <a
                                    href={item.url}
                                    className="group cursor-pointer"
                                >
                                    <span
                                        className={`inline-block py-2 border-b-2 ${activeCss(
                                            item
                                        )} group-hover:border-red-500`}
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
