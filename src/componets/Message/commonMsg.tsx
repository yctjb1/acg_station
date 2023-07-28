import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface IAnchorOrigin {
    vertical: 'bottom' | 'top'
    horizontal: 'right' | 'center' | 'left',
}
interface ISimpleMsg {
    // key: any,
    open: boolean,
    message: string,
    autoHideDuration?: number | null,
    anchorOrigin?: IAnchorOrigin,
    handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => {} | any,
}

interface IcommonMsg extends ISimpleMsg {
    autoHideDuration?: number | null,
    severity: "success" | "info" | "warning" | "error",
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// 状态与关闭方法必穿，默认会根据autoHideDuration自动调用handleClose
const BaseMessage = ({
    open,
    message,
    handleClose,
    severity,
    autoHideDuration = 6000,
    anchorOrigin = { vertical: 'top', horizontal: 'center' }
}: IcommonMsg) => {
    return <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose} anchorOrigin={anchorOrigin}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
}

const SuccessMessage = (props: ISimpleMsg) => {
    const newProps: IcommonMsg = {
        severity: "success",
        ...props
    }
    // return <BaseMessage {...newProps} />
    return <BaseMessage {...newProps} />
}
const WarningMessage = (props: ISimpleMsg) => {
    const newProps: IcommonMsg = {
        severity: "warning",
        ...props
    }
    return <BaseMessage {...newProps} />
}
const ErrorMessage = (props: ISimpleMsg) => {
    const newProps: IcommonMsg = {
        severity: "error",
        ...props
    }
    return <BaseMessage {...newProps} />
}


export {
    BaseMessage,
    SuccessMessage,
    WarningMessage,
    ErrorMessage,
    type ISimpleMsg,
    type IcommonMsg,
    Alert
}