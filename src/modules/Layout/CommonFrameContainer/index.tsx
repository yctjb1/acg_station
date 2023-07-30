import React, { useCallback, useEffect } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
    atomFrameType, userInfoAtoms,
    successMsgStatus, successMsg,
    warningMsgStatus, warningMsg,
    errorMsgStatus, errorMsg
} from "models/index";
import { initUserInfo } from "@/constants"
import { useLocation, useNavigate } from "react-router-dom";
import SimplePageFrame from "../SimplePageFrame";
import {
    BaseMessage,
    SuccessMessage,
    WarningMessage,
    ErrorMessage,
} from 'componets/Message/commonMsg';
import { userLogin } from "constants/index";
import FloatingActionButtons from "@/componets/Button/FloatingActionButtons";
import { userLogout } from "constants/index";

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
    const navigate = useNavigate();
    const pathname = location?.pathname || "";
    const [userInfo, setUserInfo] = useRecoilState(userInfoAtoms);
    const [msgStatus, setMsgStatus] = React.useState<boolean>(false);
    const [successOpen, setSuccessOpen] = useRecoilState(successMsgStatus);
    const [warningOpen, setWarningOpen] = useRecoilState(warningMsgStatus);
    const [errorOpen, setErrorOpen] = useRecoilState(errorMsgStatus);
    const successMessage = useRecoilValue(successMsg);
    const warningMessage = useRecoilValue(warningMsg);
    const errorMessage = useRecoilValue(errorMsg);
    const setSuccessMsg = useSetRecoilState(successMsg);
    const setErrorMsg = useSetRecoilState(errorMsg);
    const hiddenFloatingAB = [
        "/web/login", "/web/newpassword", "/web/register"
    ].includes(pathname) || pathname.startsWith("/web/dev") || pathname.startsWith("/web/modules");//特定路由下隐藏功能悬浮按钮
    useEffect(() => {
        // 例子：特定路由下更换frameType
        // if(pathname.startsWith("/dev")){
        //     setFrameType("default")
        // }
        const { defaultUserId } = userInfo
        const autoLogin = localStorage.getItem("acghome_autoLogin");
        if (autoLogin) {
            if (!defaultUserId) {
                try {
                    const autoLoginObj = JSON.parse(autoLogin);
                    const params = {
                        userEmail: autoLoginObj.userEmail,
                        loginCode: autoLoginObj.autoLoginCode,
                        userName: autoLoginObj.userName,
                        session_id: autoLoginObj.session_id
                    }
                    userLogin(params).then((res: any) => {
                        if (res && res.data) {
                            const {
                                errStatus,
                                message,
                                extra
                            } = res.data
                            if (errStatus === 0) {
                                setUserInfo(extra);
                            } else {
                                localStorage.removeItem("acghome_autoLogin");
                                //免登验证失败目前只有setting需要返回【暂时】
                                if (pathname === "/web/settting") {
                                    navigate("/web/login");
                                }
                            }
                        }
                    })
                        .catch((error: any) => {
                            setErrorMsg(error)
                            setErrorOpen(true)
                        })
                } catch (e) {
                    sessionStorage.removeItem("autoLogin")
                    setErrorMsg("免登凭证转JSON失败，请重新登录！")
                    setErrorOpen(true)
                }
            }
        }

    }, []);
    const handleLogout = useCallback(() => {
        localStorage.removeItem("acghome_autoLogin");
        userLogout({ session_id: userInfo.session_id }).then((res: any) => {
            if (res && res.data) {
                const {
                    errStatus,
                    message,
                    extra
                } = res.data
                if (errStatus === 0) {
                    setUserInfo(initUserInfo)
                    setSuccessMsg("请重新登录！")
                    setSuccessOpen(true)
                } else {
                    setErrorMsg(message)
                    setErrorOpen(true)
                }
            }
        })
            .catch((error: any) => {
                setErrorMsg(error)
                setErrorOpen(true)
            }).finally(() => {
                // navigate("/home")
                navigate("/web/login")
            })
    }, [userInfo.session_id])
    const GlobalComponents = <>
        {!hiddenFloatingAB && <FloatingActionButtons
            faceClick={() => {
                navigate(`/web/zone/${userInfo.uuid}`)
            }}
            defaultUserId={userInfo.defaultUserId}
            loginClick={() => navigate("/web/login")}
            logoutClick={() => handleLogout()}
        />}
        <SuccessMessage open={successOpen} handleClose={() => setSuccessOpen(false)} message={successMessage} />
        <WarningMessage open={warningOpen} handleClose={() => setWarningOpen(false)} message={warningMessage} />
        <ErrorMessage open={errorOpen} handleClose={() => setErrorOpen(false)} message={errorMessage} />
    </>
    const DefaultRender = () => (
        <div className="acg_default_page_frame h-screen">
            <>
                {GlobalComponents}
                {children}
            </>
        </div>
    );
    switch (frameType) {

        case "default":
            return <DefaultRender />;
        case "simple-page":
            return <SimplePageFrame>
                <>
                    {GlobalComponents}
                    {children}
                </>
            </SimplePageFrame>;
        default:
            return <DefaultRender />;
    }
};
export default CommonFrameContainer;
