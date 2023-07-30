
import { AxiosResponse } from 'axios';
import { axiosRequest, ICommonResponse } from "./index";

export const emailSend = (userEmail: string): Promise<AxiosResponse<ICommonResponse>> => {
    return axiosRequest.post(`/v1/email/send`, {
        userEmail
    })
};
export const pwdEmailSend = (aimEmail: string): Promise<AxiosResponse<ICommonResponse>> => {
    return axiosRequest.post(`/v1/email/newpwd`, {
        aimEmail
    })
};
