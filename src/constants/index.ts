export const DEFAULT_NAME = 'acg_station';
export const CREATOR_CN = '独傲的野狼';
export const CREATOR_EN = 'devwolf';
export interface ICommonResponse {
    res: {
        data: {
            errStatus: number;
            message: string;
            extra?: any;
        }
    }
};
export const initUserInfo = {
    userType: null,
    defaultUserId: null,
    sessionCtime: null,
    autoLoginCode: null,
    userPhone: null,
    userEmail: null,
    userName: null,
    userNickName: null,
}
export * from './emailApi';
export * from './userApi';
export * from './myRequest';
export * from './roomApi';
export * from './commentApi';