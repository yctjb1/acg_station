import React from "react";
import { HomePageTopNav } from "modules/PageNav";
import FilingFooter from '../FilingFooter'
interface ISimplePageFrameProps {
    children: React.ReactNode;
    // 其他属性
    topNav?: "default" | React.ReactNode | false;
}

const SimplePageFrame: React.FC<ISimplePageFrameProps> = ({
    children,
    topNav = "default",
    ...props
}: ISimplePageFrameProps) => {
    return (
        <div className="acg_simple_page_frame h-screen">
            {topNav ? topNav === "default" ? <HomePageTopNav /> : topNav : null}
            <div className="frame_container px-[8px]">
                {children}
            </div>
            <FilingFooter />
        </div>
    );
};
export default SimplePageFrame;
