import { AxiosResponse } from 'axios';
import { axiosRequest, ICommonResponse } from "./index";

export const createRoom = ({
    roomName,
    roomType,
    openTime,
    abstract,
    ownerUUid
}: {
    roomName: string,
    roomType: string,
    openTime: string,
    abstract: string,
    ownerUUid: string | number,
}): Promise<AxiosResponse<ICommonResponse>> => {
    return axiosRequest.post(`/v1/room/create`, {
        roomName,
        roomType,
        openTime,
        abstract,
        ownerUUid
    })
};
export const getRoomList = ({

}: {

    }): Promise<AxiosResponse<ICommonResponse>> => {
    return axiosRequest.post(`/v1/room/list`, {

    })
};
export const getRoomInfo = ({
    roomId,
    infoType,
}: {
    roomId: number,
    infoType: 'base',
}): Promise<AxiosResponse<ICommonResponse>> => {
    return axiosRequest.post(`/v1/room/info`, {
        roomId,
        infoType,
    })
};
export const handleMember = ({
    roomId,
    actionType,
    memberType,
    memberUUid
}: {
    roomId: number,
    actionType: 'add' | 'remove'
    memberType: 'joiner' | 'admin' | 'prohibitor',
    memberUUid: number
}): Promise<AxiosResponse<ICommonResponse>> => {
    return axiosRequest.post(`/v1/room/handleMember`, {
        roomId,
        actionType,
        memberType,
        memberUUid
    })
};
