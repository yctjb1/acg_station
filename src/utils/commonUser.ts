import { userLogout } from "constants/index";

export const commonLogout = (session_id: string) => {
    localStorage.removeItem("acghome_autoLogin");
    return userLogout({ session_id: session_id });
}