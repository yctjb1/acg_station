import React, { useCallback, useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { TextareaDefault } from 'componets/Input'
import {
    atomFrameType,
    successMsgStatus, successMsg,
    errorMsgStatus, errorMsg,
} from "models/index";
import { getRoomInfo, createComment, getComments, handleMember } from "constants/index"
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import TextsmsIcon from '@mui/icons-material/Textsms';
import dayjs from 'dayjs';
import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            className="flex-1 p-[4px]"
            {...other}
        >
            {value === index && (
                children
            )}
        </div>
    );
}


const GroupDetail = () => {
    const setRecoilState = useSetRecoilState(atomFrameType);
    const theme = useTheme();
    const { groupId } = useParams();

    const [minorTabvalue, setMinorTabvalue] = React.useState(0);
    const [loading, setLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState<any>({});
    const [roomInfo, setRoomInfo] = useState<any>({});
    const [lastMinorCtime, setLastMinorCtime] = useState<number>(0);
    const [favRoom, setFavRoom] = useState(false);
    const [mainText, setMainText] = useState<string>("");
    const [minorText, setMinorText] = useState<string>("");
    const [mainComments, setMainComments] = useState<any>([]);
    const [minorComments, setMinorComments] = useState<any>([]);



    const setSuccessOpen = useSetRecoilState(successMsgStatus);
    const setSuccessMsg = useSetRecoilState(successMsg);
    const setErrorOpen = useSetRecoilState(errorMsgStatus);
    const setErrorMsg = useSetRecoilState(errorMsg);
    const isOwner = React.useMemo(() => loginInfo?.uuid === roomInfo?.owner?.uuid, [loginInfo?.uuid, roomInfo?.owner?.uuid]);

    const io = React.useRef<any>(null);
    const socket = React.useRef<any>(null);

    const handleChangeMinorTab = (event: React.SyntheticEvent, newValue: number) => {
        setMinorTabvalue(newValue);
    };


    useEffect(() => {
        const autoLogin = localStorage.getItem("acghome_autoLogin");
        let _autoLogin: any;
        if (autoLogin) {
            try {
                _autoLogin = JSON.parse(autoLogin as string);
                setLoginInfo(_autoLogin)

            } catch (error) {
                setLoginInfo({})
                console.log(error)
            }
        }
        if (groupId) {
            queryRoomInfo(_autoLogin?.uuid || undefined)
            getAllComments()
            if (_autoLogin?.uuid && !(socketIOClient as any)?.sails) {

                try {
                    io.current = sailsIOClient(socketIOClient);
                    // io.current.sails.url = 'ws://localhost:1337';
                    // io.current.sails.url = 'http://localhost:1337';//【本地】
                    io.current.sails.url = 'http://www.acg-home.cn:1337';//【线上】(换成域名后不能用socket.current.get)

                    // io.current.sails.useCORSRouteToGetCookie = false;// 解决部署后GET https://localhost:1337/__getcookie net::ERR_CONNECTION_CLOSED问题
                    if (io.current.socket.isConnected()) {//?
                        io.current.socket.disconnect();

                    }
                    io.current.sails.autoConnect = false;
                    io.current.sails.reconnection = true;

                    io.current.sails.environment = 'production';// Disable logger in sails.io.js client
                    socket.current = io.current.sails.connect();
                    socket.current.on('comments', handleSocketEvent);
                    socket.current.get('/api/v1/socket/subscribe', { roomId: Number(groupId), uuid: _autoLogin.uuid }, (data: any, jwRes: any) => {
                        if (jwRes.statusCode !== 200 || data?.errStatus !== 0) {
                            setErrorMsg(data?.message || "websocket连接失败")
                            setErrorOpen(true)
                        } else {
                            console.log(data)
                        }
                    });
                } catch (error) {
                    console.log(error)
                }
            }

        }

        // 在组件卸载时清理 io
        return () => {

            if (socket.current) {
                if (socket.current.isConnected()) {
                    socket.current.disconnect();
                }

                socket.current.off('comments', () => { console.log("socket监听已关闭") });
            }
        };

    }, [])
    const handleSocketEvent = (msg: any) => {

        const actionType = msg?.action?.type;
        const createdComment: any = msg?.createdComment;
        if (actionType === "info") {
            console.log(msg?.action?.data)
        }
        if (createdComment) {
            if (createdComment.commentPosition === "main") {
                setMainComments((state: any) => [...state, {
                    ...createdComment
                }])
            }
            if (createdComment.commentPosition === "minor") {
                setMinorComments((state: any) => [...state, {
                    ...createdComment
                }])
            }
        }

    }
    const queryRoomInfo = (loginUUid?: string) => {
        getRoomInfo({
            roomId: Number(groupId),
            infoType: 'base',
        }).then((res: any) => {
            if (res && res.data) {
                const {
                    errStatus,
                    message,
                    extra
                } = res.data
                if (errStatus === 0) {
                    const _roomInfo = extra.room;
                    setRoomInfo(_roomInfo)
                    const _joinersObj: any = {}
                    if (Array.isArray(_roomInfo?.joiners)) {
                        _roomInfo.joiners.map((item: any) => {
                            _joinersObj[item.uuid] = item;
                        })
                    }
                    const _loginUUid = loginUUid || loginInfo?.uuid;
                    setFavRoom(_joinersObj[_loginUUid] ? true : false)
                } else {
                    setErrorMsg(message)
                    setErrorOpen(true)
                }
            }
        })
            .catch((error: any) => {
                setErrorMsg(error)
                setErrorOpen(true)

            })
    }
    const getMainComments = () => {
        getComments({
            roomId: Number(groupId),
            actionType: "main"
        }).then((res: any) => {
            if (res && res.data) {
                const {
                    errStatus,
                    message,
                    extra
                } = res.data
                if (errStatus === 0) {
                    setMainComments(extra.list)
                } else {
                    setErrorMsg(message)
                    setErrorOpen(true)
                }
            }
        })
            .catch((error: any) => {
                setErrorMsg(error)
                setErrorOpen(true)

            })
    }
    const getMinorComments = () => {
        getComments({
            roomId: Number(groupId),
            actionType: "minor"
        }).then((res: any) => {
            if (res && res.data) {
                const {
                    errStatus,
                    message,
                    extra
                } = res.data
                if (errStatus === 0) {
                    setMinorComments(extra.list)
                } else {
                    setErrorMsg(message)
                    setErrorOpen(true)
                }
            }
        })
            .catch((error: any) => {
                setErrorMsg(error)
                setErrorOpen(true)

            })
    }
    const getAllComments = () => {
        //todo 加入2个websocket
        getMainComments()
        getMinorComments()
    }
    const handleFav = (fav: boolean) => {
        if (!loginInfo?.uuid) return;
        const params: any = {
            roomId: Number(groupId),
            actionType: fav ? "add" : "remove",
            memberType: "joiner",
            memberUUid: loginInfo.uuid
        }
        handleMember(params).then((res: any) => {
            if (res && res.data) {
                const {
                    errStatus,
                    message,
                    extra
                } = res.data
                if (errStatus === 0) {
                    setFavRoom(fav)
                } else {
                    setErrorMsg(message)
                    setErrorOpen(true)
                }
            }
        })
            .catch((error: any) => {
                setErrorMsg(error)
                setErrorOpen(true)

            })
    }
    const broadcast = (createdComment: any) => {
        socket.current.post('/api/v1/socket/broadcast', { roomId: Number(groupId), createdComment, eventName: "comments" }, (data: any, jwRes: any) => {
            if (jwRes.statusCode !== 200 || data.errStatus !== 0) {
                setErrorMsg(data?.message || "websocket连接失败")
                setErrorOpen(true)
            }
        });
    }
    const handleMainComment = () => {
        if (mainText) {
            createComment({
                content: mainText,
                postion: "main",
                roomId: Number(groupId),
                commentatorUUid: "" + loginInfo.uuid,
            }).then((res: any) => {
                if (res && res.data) {
                    const {
                        errStatus,
                        message,
                        extra
                    } = res.data
                    if (errStatus === 0) {
                        setMainText("")
                        broadcast(extra.createdComment)
                        // getMainComments()
                    } else {
                        setErrorMsg(message)
                        setErrorOpen(true)
                    }
                }
            })
                .catch((error: any) => {
                    setErrorMsg(error)
                    setErrorOpen(true)

                })
        }

    }
    const handleMinorComment = () => {
        if (minorText) {
            createComment({
                content: minorText,
                postion: "minor",
                roomId: Number(groupId),
                commentatorUUid: "" + loginInfo.uuid,
            }).then((res: any) => {
                if (res && res.data) {
                    const {
                        errStatus,
                        message,
                        extra
                    } = res.data
                    if (errStatus === 0) {
                        setMinorText("")
                        broadcast(extra.createdComment)
                        // getMinorComments()
                    } else {
                        if (extra?.lastMinorCtime) {
                            setLastMinorCtime(extra.lastMinorCtime)
                            setErrorMsg(`${message}最后的发言时间为${dayjs(extra.lastMinorCtime).format('YYYY-MM-DD HH:mm:ss')}`)
                            setErrorOpen(true)
                        } else {
                            setErrorMsg(message)
                            setErrorOpen(true)
                        }
                    }
                }
            })
                .catch((error: any) => {
                    setErrorMsg(error)
                    setErrorOpen(true)

                })
        }

    }

    const handleCommentKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, func: Function) => {
        if (event.key === 'Enter') {
            if (lastMinorCtime) {
                const seconds = Math.trunc((lastMinorCtime + 60 * 1000 - Date.now()) / 1000)
                if (seconds > 0) {
                    setErrorMsg(`发言冷却还剩${seconds}秒`)
                    setErrorOpen(true)
                } else {
                    func()
                }
            } else {
                func()
            }

        }
    }
    const MainStage = () => {
        return <div className="w-3/4 border border-solid border-indigo-500 flex flex-col p-[4px]">
            <div className="title min-h-[100px]">
                <div className="flex min-h-[30px] items-center">
                    房间:<b>{roomInfo.roomName}</b>
                    &nbsp;&nbsp;
                    房主：<a className='inline-flex items-center no-underline' href={`/web/zone/${roomInfo?.owner?.uuid}`}>
                        <Avatar sx={{ bgcolor: red[500], height: 24, width: 24 }} sizes='small' />
                        {roomInfo?.owner?.userNickName}
                    </a>
                </div>
                <div>
                    {(isOwner || !loginInfo?.uuid) ? null : favRoom ? <IconButton onClick={() => handleFav(false)} title="退订">
                        <FavoriteIcon />
                    </IconButton>
                        : <IconButton onClick={() => handleFav(true)} title="订阅">
                            <FavoriteBorder />
                        </IconButton>}
                </div>

            </div>
            <div className="comments flex-1 mt-[-8px] pb-[12px] max-h-[780px] overflow-y-scroll">
                {
                    mainComments.map((item: any, index: any) => <Paper elevation={3} key={item.id} className="w-3/4 p-[8px] ml-[12px] mt-[8px]">
                        <div style={{ whiteSpace: "pre-wrap" }}>{item.content}</div>
                        <div className="footer flex justify-between items-center">
                            <span style={{ fontSize: 12, color: "grey" }}>{dayjs(item.ctime).format('YYYY-MM-DD HH:mm:ss')}</span>
                            {/* 显示再编辑的时间？ */}
                            <div>
                                <Button disabled>编辑史</Button>
                                {isOwner && <Button disabled>再编辑</Button>}
                            </div>
                        </div>
                    </Paper>)
                }

            </div>
            {isOwner && <div className="submit min-h-[200px] flex items-center">
                <TextareaDefault placeholder="暂时限定200字" style={{ margin: 8 }} minRows={8}
                    value={mainText}
                    onChange={(event: any) => {
                        setMainText(event.target.value);
                    }}
                    onBlur={() => {
                        setMainText((_roomAbstract) => _roomAbstract?.trim()?.slice(0, 201))
                    }}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === 'Enter') {
                            handleMainComment()
                        }
                    }}
                />
                <div className="inline-flex max-h-[40px]">
                    {<IconButton aria-label="add to favorites" onClick={() => handleMainComment()}>
                        <TextsmsIcon />
                    </IconButton>}
                </div>

            </div>}
        </div>
    }
    const MinorStage = () => {
        return <div className="w-1/4 border border-solid border-teal-400 flex flex-col">
            <Tabs
                value={minorTabvalue}
                onChange={handleChangeMinorTab}
                variant="scrollable"
                scrollButtons
                sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 0.3 },
                    },
                }}
            >
                <Tab label="聊天" />
                <Tab label="人群" />
                <Tab label="黑名单" />
                <Tab label="屏蔽表" />
            </Tabs>

            <TabPanel value={minorTabvalue} index={0} >
                <div className="flex flex-col h-full">
                    <div className="flex-1 mt-[-8px] pb-[8px] max-h-[800px] overflow-y-scroll">
                        {/* 房主或者号主的发言左对齐 */}
                        {
                            minorComments.map((item: any, index: any) => <div className="flex mt-[8px]" style={{ justifyContent: "flex-end" }} key={item.id}>
                                <div className="w-3/5 pb-[4px]" style={{ borderBottom: "1px dashed grey" }}>
                                    <div className="flex justify-between items-center">
                                        <a className='inline-flex items-center no-underline' href={`/web/zone/${item?.commentator?.uuid}`} style={{
                                            overflowWrap: 'break-word',//word-wrap改名为 overflow-wrap
                                            wordBreak: 'break-all',
                                            whiteSpace: 'pre-wrap'
                                        }}>
                                            <Avatar sx={{ bgcolor: red[500], height: 24, width: 24 }} sizes='small' />
                                            {item?.commentator?.userNickName}
                                        </a>
                                        <span className="ml-[4px] text-right w-[80px]" style={{ fontSize: 12, color: "grey" }}>{dayjs(item.ctime).format('YYYY-MM-DD HH:mm:ss')}</span>
                                    </div>

                                    <div style={{ whiteSpace: "pre-wrap" }}>{item?.content}</div>
                                </div>
                            </div>)
                        }

                    </div>
                    <div className="submit min-h-[200px] flex items-center">
                        <Input placeholder="发言需登录+订阅，暂限100字" style={{ margin: 8, flex: 1 }}
                            value={minorText}
                            onChange={(event: any) => {
                                setMinorText(event.target.value.trim());
                            }}
                            onBlur={() => {
                                setMinorText((_roomAbstract) => _roomAbstract?.trim()?.slice(0, 101))
                            }}
                            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleCommentKeyDown(event, handleMinorComment)}
                        />
                        <div className="inline-flex max-h-[40px]">
                            {(isOwner || favRoom) ? <IconButton aria-label="add to favorites" onClick={() => handleMinorComment()}>
                                <TextsmsIcon />
                            </IconButton> : <span></span>}
                        </div>

                    </div>
                </div>
            </TabPanel>
            <TabPanel value={minorTabvalue} index={1} >
                这里是人群
            </TabPanel>
            <TabPanel value={minorTabvalue} index={2} >
                这里是黑名单
            </TabPanel>
            <TabPanel value={minorTabvalue} index={3} >
                这里是屏蔽表(完全没做)
            </TabPanel>
        </div>
    }

    return (
        <div className="flex justify-center">
            <Helmet>
                <title>{"部落" + groupId}</title>
            </Helmet>
            <div className="flex w-10/12" style={{
                minHeight: "calc(100vh - 200px)"
            }}>
                {MainStage()}
                {MinorStage()}
            </div>
        </div>
    );
};

export default GroupDetail;
