import React, { useCallback, useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
    userInfoAtoms,
    successMsgStatus, successMsg,
    errorMsgStatus, errorMsg,
} from "models/index";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import SimpleCard from "componets/Card/SimpleCard";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Fab from '@mui/material/Fab';
import {
    userBaseInfo, userSetting, pwdEmailSend, userNewPwd
} from "constants/index";
import { UserTypeCN, IUserType } from "@/interface";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import qs from 'qs';


const Zone = () => {
    const queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    const navigate = useNavigate();
    const { nameplate } = useParams();
    const aimNickName = typeof (queryParams.aimNickName) === "string" ? decodeURIComponent(queryParams.aimNickName) : "";
    // 部分onBlur自动保存,用户名默认取userId。保存时检查是否符合当前者？进入时检查？后选方案：注册码作为访问凭证？或者登陆or免登成功后数据库手搓一个凭证?
    const [countdown, setCountDown] = React.useState<number>(-1);
    const [userName, setUserName] = React.useState<string | null>("");
    const [nickName, setNickName] = React.useState<string | null>("");
    const [unError, setUnError] = React.useState<boolean>(false);
    const [nnError, setNnError] = React.useState<boolean>(false);
    const [userEmail, setUserEmail] = React.useState<string | null>("");
    const [userType, setUserType] = React.useState<string | null>("");
    const [emailError, setEmailError] = React.useState<boolean>(false);
    const [userNotFound, setUserNotFound] = React.useState<boolean>(false);
    const [zoneUuid, setZoneUuid] = React.useState<string | null>("");

    const [readMode, setReadMode] = React.useState<boolean>(false);//1：不是本人的信息只读；2:修改提交后的loading只读

    const [userInfo, setUserInfo] = useRecoilState(userInfoAtoms);
    const setSuccessOpen = useSetRecoilState(successMsgStatus);
    const setSuccessMsg = useSetRecoilState(successMsg);
    const setErrorOpen = useSetRecoilState(errorMsgStatus);
    const setErrorMsg = useSetRecoilState(errorMsg);
    useEffect(() => {//初始化获取信息
        const params: any = {};
        if (aimNickName) params.userNickName = aimNickName;
        if (nameplate) params.nameplate = nameplate;
        userBaseInfo(params).then((res: any) => {
            if (res && res.data) {
                const {
                    errStatus,
                    message,
                    extra
                } = res.data
                if (errStatus === 0) {
                    setNickName(extra.userNickName)
                    const myType: IUserType = extra?.userType;
                    const _userType = UserTypeCN[myType || "unknown"];
                    setUserType(_userType)
                    setUserEmail(extra.userEmail)
                    setZoneUuid(extra.uuid)
                } else {
                    setErrorMsg(message)
                    setErrorOpen(true)
                    if (errStatus === 2) {
                        setUserNotFound(true)
                    }
                }
            }
        })
            .catch((error: any) => {
                setErrorMsg(error)
                setErrorOpen(true)
                // navigate("/web/home")
            }).finally(() => {
                setReadMode(true)
            })

    }, [nameplate])
    useEffect(() => { }, [userInfo?.uuid])
    return (
        <div className="flex flex-col my-[8px] mx-8">
            <SimpleCard
                cardTitle={<div className="my-[8px] flex justify-between">
                    <span>{nickName ? `${nickName}的空间` : "未找到该用户识别码或昵称"}</span>
                    {(Number(userInfo?.uuid) === Number(zoneUuid)) && <Fab color="secondary" aria-label="user-setting" size={"small"} variant={"circular"} onClick={() => {
                        navigate("/web/setting")
                    }} title='用户设置' className='w-[36px] h-[36px] group'>
                        <ManageAccountsIcon className='inline-block group-hover:hidden' />
                        <span className='hidden group-hover:inline-block'>设置</span>
                    </Fab>}
                </div>}
                cardFooter={null}
            >
                <div className="flex flex-col setting_content">
                    <Box sx={{ maxWidth: 320 }} className="my-[8px] min-h-[100px]">
                        <FormControl variant="standard">
                            <InputLabel htmlFor="input-nickname">
                                昵称
                            </InputLabel>
                            <Input
                                id="input-nickname"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                                value={nickName}
                                readOnly={readMode}
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                    setNickName(event.target.value as string);
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ maxWidth: 200 }} className="my-[8px]">
                        权限：{userType}
                    </Box>
                    <div className="flex my-[8px]" >

                        <Box sx={{ maxWidth: 280 }}>
                            <FormControl fullWidth>
                                <Input
                                    startAdornment={<InputAdornment position="start">邮箱</InputAdornment>}
                                    value={userEmail} readOnly
                                />
                            </FormControl>
                        </Box>
                    </div>
                </div>
            </SimpleCard>
        </div>

    );
};

export default Zone;
