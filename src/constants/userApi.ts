import { DEFAULT_API } from "constants/index";
import axios, { AxiosResponse } from 'axios';
import { ICommonResponse } from "./index";

export const userSignUp = ({
    userEmail,
    userPwd,
    verifyVal
}: {
    userEmail: string,
    userPwd: string,
    verifyVal: string
}): Promise<AxiosResponse<ICommonResponse>> => {
    return axios.post(`${DEFAULT_API}/v1/user/signup`, {
        userEmail,
        userPwd,
        verifyVal
    })
};

export const userLogin = ({
    loginCode,
    userEmail,
    userName,
    userPwd,
    session_id,
}: {
    loginCode?: string,
    userName?: string,
    userEmail?: string,
    userPwd?: string,
    session_id?: string,
}): Promise<AxiosResponse<ICommonResponse>> => {
    if (loginCode) {

        return axios.post(`${DEFAULT_API}/v1/oauth/autoLogin`, {
            loginEmail: userEmail,
            loginName: userName,
            loginCode, session_id
        })
    }
    else {
        return axios.post(`${DEFAULT_API}/v1/user/login`, {
            userName, userEmail, userPwd
        })
    }
};

export const userBaseInfo = ({
    userNickName,
    nameplate,
}: {
    userNickName?: string,
    nameplate?: string,
}): Promise<AxiosResponse<ICommonResponse>> => {

    return axios.get(`${DEFAULT_API}/v1/oauth/getInfo`, {
        params: {
            nameplate,
            userNickName,
        },
    })
};

export const userLogout = ({
    session_id,
}: {
    session_id: string,
}): Promise<AxiosResponse<ICommonResponse>> => {
    return axios.get(`${DEFAULT_API}/v1/oauth/logout`, {
        params: {
            session_id,
        },
    })
};
export const userSetting = ({
    userId,
    newUserName,
    newNickName,
    sessionId
}: {
    userId: string | number,
    newUserName?: string,
    newNickName?: string,
    sessionId: string,
}): Promise<AxiosResponse<ICommonResponse>> => {
    return axios.post(`${DEFAULT_API}/v1/oauth/updateBase`, {
        userId,
        newUserName,
        newNickName,
        sessionId
    })
};
export const userNewPwd = ({
    userEmail, userPwd, verifyVal
}: {
    userEmail: string, userPwd: string, verifyVal: string
}): Promise<AxiosResponse<ICommonResponse>> => {
    return axios.post(`${DEFAULT_API}/v1/oauth/newpwd`, {
        userEmail, userPwd, verifyVal
    })
};
export const userSession = ({
    session_id, type
}: {
    session_id: string, type: "sync_db" | any;
}): Promise<AxiosResponse<ICommonResponse>> => {
    return axios.post(`${DEFAULT_API}/v1/user/session`, {
        session_id, type
    })
};