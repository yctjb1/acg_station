import React, { useCallback, useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
    userInfoAtoms,
    successMsgStatus, successMsg,
    errorMsgStatus, errorMsg,
} from "models/index";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import SimpleCard from "componets/Card/SimpleCard";
import { regexpEmail, regexpPwd, regexpUserName, regexpNickName, commonLogout } from 'utils/index';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {
    userBaseInfo, userSetting, pwdEmailSend, userNewPwd
} from "constants/index";
import { UserTypeCN, IUserType } from "@/interface";
import { useNavigate } from "react-router-dom";
import MD5 from 'crypto-js/md5';
import qs from 'qs';

const countdownLimit = 60;
const titleOptions = {
    "setting": "用户中心",
    "newpwd": "修改密码",
}
const CardContent = ({ mode }: { mode: string }) => {
    const queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    const navigate = useNavigate();
    const aimNickName = typeof (queryParams.aimNickName) === "string" ? decodeURIComponent(queryParams.aimNickName) : "";
    const urlEmail = typeof (queryParams.userEmail) === "string" ? queryParams.userEmail : "";
    const urlVCode = typeof (queryParams.verifyCode) === "string" ? queryParams.verifyCode : "";
    // 部分onBlur自动保存,用户名默认取userId。保存时检查是否符合当前者？进入时检查？后选方案：注册码作为访问凭证？或者登录or免登成功后数据库手搓一个凭证?
    const [countdown, setCountDown] = React.useState<number>(-1);
    const [userName, setUserName] = React.useState<string | null>("");
    const [nickName, setNickName] = React.useState<string | null>("");
    const [unError, setUnError] = React.useState<boolean>(false);
    const [nnError, setNnError] = React.useState<boolean>(false);
    const [emailCodeError, setEmailCodeError] = React.useState<boolean>(false);
    const [userEmail, setUserEmail] = React.useState<string | null>("");
    const [npwdEmail, setNpwdEmail] = React.useState<string | null>(urlEmail);//mode==="newpwd"
    const [userType, setUserType] = React.useState<string | null>("");
    const [userPwd, setUserPwd] = React.useState<string>("");//仅新密码
    const [emailCode, setEmailCode] = React.useState<string>(urlVCode);
    const [emailError, setEmailError] = React.useState<boolean>(false);
    const [pwdError, setPwdError] = React.useState<boolean>(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const [loading, setLoading] = React.useState<boolean>(true);//1：不是本人的信息只读；2:修改提交后的loading只读

    const [userInfo, setUserInfo] = useRecoilState(userInfoAtoms);
    const setSuccessOpen = useSetRecoilState(successMsgStatus);
    const setSuccessMsg = useSetRecoilState(successMsg);
    const setErrorOpen = useSetRecoilState(errorMsgStatus);
    const setErrorMsg = useSetRecoilState(errorMsg);

    const timer = React.useRef<any>(null);
    const handleCountDown = useCallback(() => {
        timer.current = setInterval(function () {
            if (countdown > -1) {
                setCountDown(prev => prev - 1)
            }
        }, 1000);

    }, [countdown])

    useEffect(() => {
        if (countdown === countdownLimit) {
            handleCountDown();
        } else if (countdown === -1) {
            clearInterval(timer.current)
        }
    }, [countdown])
    useEffect(() => {//初始化获取信息
        if (mode === "setting") {
            if (userInfo.defaultUserId) {
                const myType: IUserType = userInfo?.userType;
                const _userType = UserTypeCN[myType || "unknown"];
                setUserName(userInfo.userName)
                setNickName(userInfo.userNickName)
                setUserType(_userType)
                setUserEmail(userInfo.userEmail)
                setLoading(false)
            } else {
                //缺失userInfo
                const autoLogin = localStorage.getItem("acghome_autoLogin");
                try {
                    const { session_id } = JSON.parse(autoLogin || "{}");
                    if (!autoLogin || !session_id) {
                        navigate("/web/home")
                    }
                } catch (e) {
                    navigate("/web/home")
                }
            }
        }

    }, [userInfo.defaultUserId])
    useEffect(() => {

        return () => {
            clearInterval(timer.current)
        }
    }, [])
    const check_PwdEmail = (pwdEmail = npwdEmail) => regexpEmail.test(pwdEmail?.trim() || "");
    const check_UName = (new_UName = userName) => regexpUserName.test(new_UName?.trim() || "");
    const check_NName = (new_NName = nickName) => regexpNickName.test(new_NName?.trim() || "");
    const handleChangeBase = () => {
        //基础信息修改后调用免登更新session
        if (loading) return;
        const {
            defaultUserId,
            session_id,
            userNickName: prev_nickName,
            userName: prev_userName
        } = userInfo;
        // todo 两处修改效验——————要抽
        const new_userName = userName?.trim() || "";
        const new_nickName = nickName?.trim() || "";

        const params: any = {
            userId: defaultUserId,
            sessionId: session_id
        }
        let edited = false, _unError = false, _nnError = false;
        if (prev_userName !== new_userName) {
            params.newUserName = new_userName;
            _unError = !check_UName(new_userName);
            setUnError(_unError)
            edited = true;
        };
        if (prev_nickName !== new_nickName) {
            params.newNickName = new_nickName
            _nnError = !check_NName(new_nickName)
            setNnError(_nnError)
            edited = true;
        };

        if (edited && !_unError && !_nnError) {
            userSetting(params).then((res: any) => {
                if (res && res.data) {
                    const {
                        errStatus,
                        message,
                        extra
                    } = res.data
                    if (errStatus === 0) {
                        setSuccessMsg("信息更新成功！");
                        setSuccessOpen(true);
                        localStorage.setItem("acghome_autoLogin", JSON.stringify({
                            ...extra
                        }));
                        setUserInfo(extra);
                        navigate(`/web/setting`);
                    } else {
                        setErrorMsg(message)
                        setErrorOpen(true)
                    }
                }
            })
                .catch((error: any) => {
                    setErrorMsg(error)
                    setErrorOpen(true)
                })
        }

    }
    const handleEmailSend = (aimEmail: string) => {

        setCountDown(countdownLimit);
        pwdEmailSend(aimEmail).then((res: any) => {
            if (res && res.data) {
                const {
                    errStatus,
                    message
                } = res.data
                if (errStatus === 0) {
                    setSuccessMsg(message)
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
            })


    }
    const handleChangePwd = () => {
        const noLogined = mode === "newpwd";
        let _emailError = !check_PwdEmail();
        noLogined && setEmailError(_emailError)
        let _emailCodeError = !Boolean(emailCode);
        setEmailCodeError(_emailCodeError)
        let _pwdError = !regexpPwd.test(userPwd);
        setPwdError(_pwdError)
        let checkFalse = (noLogined && _emailError) || _emailCodeError || _pwdError;
        if (!checkFalse) {
            const _userMail: string = (noLogined ? npwdEmail : userEmail) as string
            const params = {
                userEmail: _userMail,
                userPwd: MD5(userPwd).toString(),
                verifyVal: emailCode
            }
            userNewPwd(params).then((res: any) => {
                if (res && res.data) {
                    const {
                        errStatus,
                        message
                    } = res.data
                    if (errStatus === 0) {
                        setSuccessMsg(`${message}，请重新登录！`)
                        setSuccessOpen(true)
                        commonLogout(userInfo.session_id)
                        navigate("/web/login")
                    } else {
                        setErrorMsg(message)
                        setErrorOpen(true)
                    }
                }
            })
                .catch((error: any) => {
                    setErrorMsg(error)
                    setErrorOpen(true)
                })
        }
    }
    const SettingForm = (<>
        <Box sx={{ maxWidth: 320 }} className="my-[8px] min-h-[100px]">
            <FormControl variant="standard" error={unError}>
                <InputLabel htmlFor="input-username">
                    用户名
                </InputLabel>
                <Input
                    id="input-username"
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                    value={userName}
                    readOnly={loading}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setUserName(event.target.value as string);
                    }}
                />
                <FormHelperText style={{
                    position: "absolute",
                    top: "100%"
                }}>用户名需要2~15位数字、字母以及@.中任意数量的组合</FormHelperText>
            </FormControl>
        </Box>
        <Box sx={{ maxWidth: 320 }} className="my-[8px] min-h-[100px]">
            <FormControl variant="standard" error={nnError}>
                <InputLabel htmlFor="input-nickname">
                    昵称(页面显示五个汉字长度最佳)
                </InputLabel>
                <Input
                    id="input-nickname"
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                    value={nickName}
                    readOnly={loading}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setNickName(event.target.value as string);
                    }}
                />
                <FormHelperText style={{
                    position: "absolute",
                    top: "100%"
                }}>昵称需要2~10位数字、字母、汉字以及@._中任意数量的任意组合</FormHelperText>
            </FormControl>
        </Box>
        <Box sx={{ maxWidth: 200 }} className="my-[8px]">
            权限：{userType}
        </Box>
        <Box>
            <Button variant="contained" disabled={loading} onClick={() => {
                handleChangeBase()
            }}>修改基础信息</Button>
        </Box>
    </>)
    const NewPwdForm = () => (<div className="flex my-[8px] mb-[40px]">
        <Box sx={{ maxWidth: 120 }}>
            <FormControl fullWidth>
                <TextField id="signup-email-verify-input" label={"密码修改码"} value={emailCode} autoComplete={"off"} error={emailCodeError}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setEmailCode(event.target.value);
                    }}
                    onBlur={() => {
                        setEmailCodeError(!Boolean(emailCode))
                    }}
                />
            </FormControl>
        </Box>
        <Box sx={{ maxWidth: 200 }}>
            <FormControl fullWidth error={pwdError} required>
                <InputLabel htmlFor="outlined-adornment-password">密码</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword((show) => !show)}
                                onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="密码"
                    value={userPwd}
                    autoComplete={"off"}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setUserPwd(event.target.value as string);
                    }}
                    onBlur={() => {
                        setPwdError(!regexpPwd.test(userPwd) ? true : false)
                    }}
                />
                <FormHelperText style={{
                    position: "absolute",
                    top: "100%"
                }}>密码8~12位，至少1个大写字母和小写字母和1个数字</FormHelperText>
            </FormControl>
        </Box>
        <Box className="flex">
            <Button variant="contained" className="rounded-l-none -ml-2" onClick={() => {
                handleChangePwd()
            }}>确认新密码</Button>
        </Box>
    </div>)
    return <div className="flex flex-col setting_content">
        {mode === "setting" && SettingForm}
        {/* 一期不可修改邮箱 */}
        <div className="flex my-[8px]" style={emailError ? {
            marginBottom: 20
        } : {}}>

            <Box sx={{ maxWidth: 280 }}>
                {
                    mode === "setting" ?
                        <FormControl fullWidth>
                            <Input
                                startAdornment={<InputAdornment position="start">邮箱</InputAdornment>}
                                value={userEmail} readOnly
                            />
                        </FormControl>
                        : <FormControl fullWidth error={emailError}>
                            <Input
                                startAdornment={<InputAdornment position="start">邮箱*</InputAdornment>}
                                value={npwdEmail}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setNpwdEmail(event.target.value);
                                }}
                                onBlur={() => {
                                    setEmailError(!check_PwdEmail())
                                }}
                            />
                            {emailError && <FormHelperText style={{
                                position: "absolute",
                                top: "100%"
                            }}>邮箱格式错误</FormHelperText>}
                        </FormControl>

                }
            </Box>
            <Box className="flex">
                <Button variant="outlined" className="rounded-l-none -mt-[4px]" disabled={countdown != -1} onClick={() => {
                    let aimEmail;
                    if (mode === "newpwd") {
                        let checkEmail = check_PwdEmail();
                        setEmailError(!checkEmail)
                        if (!checkEmail) return;
                        aimEmail = npwdEmail
                    } else {
                        aimEmail = userEmail
                    }
                    aimEmail && handleEmailSend(aimEmail)
                }}>{countdown != -1 ? countdown + "s" : "发送密码修改码"}</Button>
            </Box>
        </div>
        {/* 默认禁用，点了修改密码后展示验证码发送框和进入cd的按钮？ */}
        {mode === "setting" && <hr className="w-full my-[8px] border-blue-500" />}
        {NewPwdForm()}
    </div>
}

const Setting = ({
    mode = "newpwd"
}: { mode: "newpwd" | "setting" }) => {

    const titleType = titleOptions[mode];
    const navigate = useNavigate();
    return (
        <div className="flex flex-col my-[8px] mx-8">
            <SimpleCard
                cardTitle={<div className="my-[8px]">
                    {titleType}
                    {mode === "newpwd" && <Button variant="text" className="mr-[8px]" onClick={() => navigate(`/web/login`)}>登录</Button>}
                </div>}
                cardFooter={null}
            >
                <CardContent mode={mode} />
            </SimpleCard>
        </div>

    );
};

export default Setting;
