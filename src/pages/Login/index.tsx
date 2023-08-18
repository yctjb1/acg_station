import React, { useCallback, useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
    atomFrameType, userInfoAtoms,
    successMsgStatus, successMsg,
    errorMsgStatus, errorMsg,
} from "models/index";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import SimpleCard from "componets/Card/SimpleCard";
import { regexpEmail, regexpPwd } from 'utils/index';
import { emailSend, userSignUp, userLogin } from "constants/index"
import { useNavigate } from "react-router-dom";
import qs from 'qs';
import MD5 from 'crypto-js/md5';

const countdownLimit = 60;
const CardContent = ({ mode, titleType }: { mode: string, titleType: string }) => {
    const queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    const urlVCode = typeof (queryParams.verifyCode) === "string" ? queryParams.verifyCode : "";
    const userOptions = [{
        label: '邮箱', value: "email"
    }, {

        label: '用户名', value: "username"
    }, {
        label: '手机号', value: "phone"
    }];
    const [userType, setUserType] = React.useState<string>(userOptions[0].value);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);
    const [loginName, setLoginName] = React.useState<string>(sessionStorage.getItem("signupEmail") || "");
    const [loginNameError, setLoginNameError] = React.useState<boolean>(false);
    const [userPwd, setUserPwd] = React.useState<string>("");
    const [pwdError, setPwdError] = React.useState<boolean>(false);
    const [userEmail, setUserEmail] = React.useState<string>("");
    const [emailCode, setEmailCode] = React.useState<string>(urlVCode);
    const [emailCodeError, setEmailCodeError] = React.useState<boolean>(false);
    const [emailError, setEmailError] = React.useState<boolean>(false);
    const [countdown, setCountDown] = React.useState<number>(-1);
    const setSuccessOpen = useSetRecoilState(successMsgStatus);
    const setSuccessMsg = useSetRecoilState(successMsg);
    const setErrorOpen = useSetRecoilState(errorMsgStatus);
    const setErrorMsg = useSetRecoilState(errorMsg);
    const setUserInfo = useSetRecoilState(userInfoAtoms);

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
    useEffect(() => {
        return () => {
            clearInterval(timer.current)
        }
    }, [])
    const handleEmailSend = () => {

        if (regexpEmail.test(userEmail)) {
            //todo发送邮件
            setCountDown(countdownLimit);

            emailSend(userEmail).then((res: any) => {
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

        } else {
            setEmailError(true)
        }
    }
    const handleSignUp = () => {
        let disabled = false;
        if (!regexpEmail.test(userEmail)) {
            setEmailError(true);
            disabled = true
        }
        if (!emailCode) {
            setEmailCodeError(true)
            disabled = true

        }
        if (!regexpPwd.test(userPwd)) {
            setPwdError(true)
            disabled = true

        }
        if (!disabled) {
            const params: any = {
                userEmail,
                userPwd: MD5(userPwd).toString(),
                verifyVal: emailCode
            };
            userSignUp(params).then((res: any) => {
                if (res && res.data) {
                    const {
                        errStatus,
                        message
                    } = res.data
                    if (errStatus === 0) {
                        setSuccessMsg("注册成功！");
                        setSuccessOpen(true);
                        sessionStorage.setItem("signupEmail", userEmail)
                        navigate("/web/login");
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
    const handleLogin = () => {
        if (!loginName) setLoginNameError(true)
        if (!userPwd) setPwdError(true)
        if (loginName && userPwd) {
            const params: any = {
                userPwd: MD5(userPwd).toString()
            };
            switch (userType) {
                case "email":
                    params.userEmail = loginName; break;
                case "username":
                    params.userName = loginName; break;
                case "phone":
                    params.userPhone = loginName; break;
            }
            userLogin(params).then((res: any) => {
                if (res && res.data) {
                    const {
                        errStatus,
                        message,
                        extra
                    } = res.data
                    if (errStatus === 0) {
                        setSuccessMsg("登录成功！");
                        setSuccessOpen(true);
                        localStorage.setItem("acghome_autoLogin", JSON.stringify({
                            ...extra
                        }));
                        setUserInfo(extra);
                        navigate(`/web/zone/${extra.uuid}`)
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

    const LoginForm = (<div className="flex flex-col login">
        <div className="flex my-[8px]">
            <Box sx={{ maxWidth: 120 }}>
                <FormControl fullWidth error={loginNameError}>
                    <InputLabel id="demo-simple-select-label">{titleType}方式</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userType}
                        label="登录方式"
                        onChange={(event: SelectChangeEvent) => {
                            setUserType(event.target.value as string);
                        }}
                    >
                        {userOptions.map((item: any, index: number) => {
                            if (item.value === "phone") return null;//暂时不开放手机号
                            return <MenuItem value={item.value} key={item.value}>{userOptions[index].label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ maxWidth: 200 }}>
                <FormControl fullWidth>
                    <TextField label={"请输入" + userOptions.find(item => item.value === userType)?.label || ""}
                        error={loginNameError}
                        value={loginName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setLoginName(event.target.value);
                        }} />
                </FormControl>
            </Box>
        </div>
    </div>)



    return <div className="flex flex-col">
        <div className="flex my-[8px] flex-wrap">
            {mode === "login" && LoginForm}
            {mode === "register" && <div className="flex flex-col signup">
                {/* <div className="flex my-[8px]">
                <Box className="inline-grid place-items-center" sx={{ maxWidth: 120 }}>
                    <InputLabel>用户名：</InputLabel>
                </Box>
                <Box sx={{ maxWidth: 200 }}>
                    <FormControl fullWidth>
                        <TextField label={"请输入用户名"} />
                    </FormControl>
                </Box>
            </div> */}
                <div className="flex my-[8px]">
                    <Box sx={{ maxWidth: 200 }}>
                        <FormControl fullWidth error={emailError} required>
                            <InputLabel htmlFor="signup-email">邮箱</InputLabel>
                            <OutlinedInput id="signup-email" value={userEmail} label="邮箱"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setUserEmail(event.target.value);
                                }}
                                onBlur={() => {
                                    setEmailError(!regexpEmail.test(userEmail) ? true : false)
                                }} />
                            {emailError && <FormHelperText>邮箱格式错误</FormHelperText>}
                        </FormControl>
                    </Box>
                </div>
                <div className="flex my-[8px]">
                    <Box sx={{ maxWidth: 200 }}>
                        <FormControl fullWidth>
                            <TextField id="signup-email-verify-input" label={"邮箱验证码"}
                                value={emailCode}
                                required
                                error={emailCodeError}
                                onBlur={
                                    () => setEmailCodeError(!emailCode ? true : false)
                                }
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setEmailCode(event.target.value);
                                }} />
                        </FormControl>
                    </Box>
                </div>
            </div>}
            <div className="flex my-[8px] ml-16" style={{ minHeight: 100 }}>
                <Box>
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
            </div>
            {mode === "register" && <div className="w-[510px] flex justify-between">
                <Button variant="outlined" disabled={countdown != -1} onClick={() => {
                    handleEmailSend()
                }}>{countdown != -1 ? countdown + "s" : "发送验证码"}</Button>
                <Box>

                    <Button variant="contained" onClick={() => handleSignUp()}>注册</Button>
                </Box>
            </div>}
            {mode === "login" && <div className="w-[588px] flex justify-between">
                <Button variant="text" onClick={() => {
                    if (userType === "email" && regexpEmail.test(loginName)) {
                        navigate(`/web/newpassword?userEmail=${loginName}`);
                    } else {
                        navigate(`/web/newpassword`);
                    }
                }}>忘记密码</Button>
                <Box>

                    <Button variant="contained" onClick={() => {
                        handleLogin()
                    }}>登录</Button>

                </Box>
            </div>}
        </div>

    </div>
}

//登录和注册组件
const Login = (props: { mode: "login" | "register" }) => {
    const { mode = "login" } = props;
    const titleType = mode === "login" ? "登录" : "注册";
    const navigate = useNavigate();
    return (
        <div className="flex flex-col my-[8px] mx-8">
            <SimpleCard
                cardTitle={<div className="my-[8px]">
                    {titleType}
                    <span className="text-red-500">*(测试性开放)</span>
                    &nbsp;
                    {
                        mode === "login" ? <Button variant="text" onClick={() => {
                            navigate(`/web/register`);
                        }}>切换注册</Button>
                            : <Button variant="text" className="mr-[8px]" onClick={() => navigate(`/web/login`)}>切换登录</Button>
                    }

                </div>}
                cardFooter={null}
                widthClassName={
                    mode === "login" ? "w-[638px]" : "w-[542px]"
                }
            >
                <CardContent mode={mode} titleType={titleType} />
            </SimpleCard>
        </div>

    );
};

export default Login;
