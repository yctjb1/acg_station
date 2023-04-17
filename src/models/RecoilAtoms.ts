import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
export const pageErrorCode = atom<number | string>({
    key: 'pageErrorCode', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});