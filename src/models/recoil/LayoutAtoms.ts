import { RecoilRoot, atom, selector } from "recoil";
type IAtomFrameType = "simple-page" | "default";
export const atomFrameType = atom<IAtomFrameType>({
    key: "atomFrame",
    default: "simple-page",
});
