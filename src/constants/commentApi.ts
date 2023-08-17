import { AxiosResponse } from 'axios';
import { axiosRequest, ICommonResponse } from "./index";

export const createComment = ({
    content,
    postion,
    roomId,
    commentatorUUid,
}: {
    content: string,
    postion: "main" | "minor",
    roomId: number,
    commentatorUUid: string,
}): Promise<AxiosResponse<ICommonResponse>> => {
    return axiosRequest.post(`/v1/comment/create`, {
        content,
        postion,
        roomId,
        commentatorUUid,
        ctime: Date.now()
    })
};
export const getComments = ({
    actionType,
    roomId,
}: {
    actionType: 'main' | 'minor',
    roomId: string | number,
}): Promise<AxiosResponse<ICommonResponse>> => {
    return axiosRequest.post(`/v1/comment/list`, {
        actionType,
        roomId,
    })
};
