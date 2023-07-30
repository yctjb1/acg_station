type IUserType = "creater" | "super_admin" | "admin" | "normal" | "visitor" | "criminal" | "vip" | "svip" | null;
interface IUserInfo {
    userType: IUserType | null,
    defaultUserId: number | null,
    sessionCtime: number | null,
    autoLoginCode: string | null,
    userPhone: number | null,
    userEmail: string | null,
    userName: string | null,
    userNickName: string | null,
    session_id?: string | any,
    [propname: string]: any
}
enum UserTypeCN {
    "creater" = "建站者",
    "super_admin" = "超级管理",
    "admin" = "管理员",
    "normal" = "普通",
    "visitor" = "游客",
    "criminal" = "罪者",
    "vip" = "vip",
    "svip" = "svip",
    "unknown" = "unknown",//ts的enum自带null的key可配置为unknown
}

export {
    type IUserType, type IUserInfo, UserTypeCN
}