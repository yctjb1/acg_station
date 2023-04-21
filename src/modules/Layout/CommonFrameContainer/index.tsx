import React, { useEffect } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { atomFrameType } from "models/index";
import { useLocation } from "react-router-dom";
import SimplePageFrame from "./SimplePageFrame";

interface IFrameContainerProps {
    children: React.ReactNode;
    // 其他属性
}

const CommonFrameContainer: React.FC<IFrameContainerProps> = ({
    children,
    ...props
}: IFrameContainerProps) => {
    const [frameType, setFrameType] = useRecoilState(atomFrameType);
    const location: any = useLocation();
    const pathname = location?.pathname || "";
    useEffect(() => {
        // 例子：特定路由下更换frameType
        // if(pathname.startsWith("/dev")){
        //     setFrameType("default")
        // }
    }, []);
    const DefaultRender = () => (
        <div className="acg_default_page_frame h-screen">{children}</div>
    );
    switch (frameType) {
        case "default":
            return <DefaultRender />;
        case "simple-page":
            return <SimplePageFrame>{children}</SimplePageFrame>;
        default:
            return <DefaultRender />;
    }
};
export default CommonFrameContainer;
