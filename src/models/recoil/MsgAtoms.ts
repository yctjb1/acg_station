import {
    RecoilRoot,
    atom,
    selector,
} from "recoil";

import {
    ISimpleMsg
} from 'componets/Message/commonMsg';

const defaultInit: ISimpleMsg = {
    open: false,
    message: "",
    autoHideDuration: 6000,
    handleClose: () => { },
}

export const successMsgStatus = atom<boolean>({
    key: "successMsgStatus",
    default: false
});
export const warningMsgStatus = atom<boolean>({
    key: "warningMsgStatus",
    default: false
});
export const errorMsgStatus = atom<boolean>({
    key: "errorMsgStatus",
    default: false
});
export const successMsg = atom<string>({
    key: "successMsgOpen",
    default: "成功！"
});
export const warningMsg = atom<string>({
    key: "warningMsg",
    default: "警告！",
});
export const errorMsg = atom<string>({
    key: "errorMsg",
    default: "错误！",
});