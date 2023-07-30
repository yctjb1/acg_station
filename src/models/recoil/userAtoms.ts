import {
    RecoilRoot,
    atom,
    selector,
} from "recoil";
import { IUserInfo } from "@/interface";
import { initUserInfo } from "@/constants"
export const userInfoAtoms = atom<IUserInfo>({
    key: "userInfoAtoms",
    default: initUserInfo
});