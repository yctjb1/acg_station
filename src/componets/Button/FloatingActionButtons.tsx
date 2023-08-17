import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import PendingIcon from '@mui/icons-material/Pending';
import LogOutIcon from '@mui/icons-material/LogOut';
import LoginIcon from '@mui/icons-material/Login';
import FaceIcon from '@mui/icons-material/Face';
import TextsmsIcon from '@mui/icons-material/Textsms';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';

interface IFloatingActionButtons {
    defaultUserId: string | number | null;
    faceClick?: Function;
    loginClick: Function;
    logoutClick: Function;
    iconSize?: "small" | "medium" | "large" | any;
    fabVariant?: "circular" | "extended";
    [propname: string]: any
}

const FloatingActionButtons = (props: IFloatingActionButtons) => {
    const {
        defaultUserId,
        faceClick,
        loginClick,
        logoutClick,
        // iconSize = "small",
        iconSize = "12px",
        fabVariant = "circular"
    } = props;
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            {defaultUserId ? <Fab color="primary" aria-label="face" title='我的空间' onClick={() => {
                faceClick && faceClick()
            }} size={iconSize} variant={fabVariant} className='w-[36px] h-[36px] group'>
                <FaceIcon className='inline-block group-hover:hidden' />
                <span className='hidden group-hover:inline-block'>空间</span>
            </Fab>
                : <Fab color="primary" aria-label="face" title='登录/注册' onClick={() => {
                    loginClick && loginClick()
                }} size={iconSize} variant={fabVariant} className='w-[36px] h-[36px] group'>
                    <NoAccountsIcon className='inline-block group-hover:hidden' />
                    <span className='hidden group-hover:inline-block'>登录</span>
                </Fab>

            }
            {defaultUserId &&
                <Fab color="info" aria-label="logout" size={iconSize} variant={fabVariant} onClick={() => {
                    logoutClick()
                }} title='退出登录' className='w-[36px] h-[36px] group'>
                    <LogOutIcon className='inline-block group-hover:hidden' />
                    <span className='hidden group-hover:inline-block'>退登</span>
                </Fab>
            }
            {/* 预留给聊天室 */}
            {/* <Fab aria-label="text-sms" disabled size={iconSize} variant={fabVariant} onClick={() => { }} title='发现' className='w-[36px] h-[36px]'>
                <TextsmsIcon />
            </Fab>
            <Fab aria-label="like" disabled size={iconSize} variant={fabVariant} onClick={() => { }} title='收藏' className='w-[36px] h-[36px]'>
                <FavoriteIcon />
            </Fab> */}
            <Fab aria-label="more" disabled size={iconSize} variant={fabVariant} title='更多' className='w-[36px] h-[36px]'>
                <PendingIcon />
            </Fab>
        </Box>
    );
}
export default FloatingActionButtons
