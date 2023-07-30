
export const regexpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const regexpPwd = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&.]{8,12}$/);
export const regexpUserName = /^[a-zA-Z0-9@.]{2,15}$/;
export const regexpNickName = /^[a-zA-Z0-9@._\u4e00-\u9fa5]{2,10}$/;