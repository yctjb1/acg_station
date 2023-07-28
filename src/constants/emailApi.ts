import { DEFAULT_API } from "constants/index";
import axios, { AxiosResponse } from 'axios';
import { ICommonResponse } from "./index";

export const emailSend = (userEmail: string): Promise<AxiosResponse<ICommonResponse>> => {
    return axios.post(`${DEFAULT_API}/v1/email/send`, {
        userEmail
    })
};
export const pwdEmailSend = (aimEmail: string): Promise<AxiosResponse<ICommonResponse>> => {
    return axios.post(`${DEFAULT_API}/v1/email/newpwd`, {
        aimEmail
    })
};
