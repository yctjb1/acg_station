import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TemporaryDrawer } from 'componets/Drawer';
import { TextareaDefault } from 'componets/Input';
import { RoomCard } from 'componets/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import {
    atomFrameType,
    successMsgStatus, successMsg,
    errorMsgStatus, errorMsg,
} from "models/index";
import { createRoom, getRoomList } from "constants/index"
const GroupList = () => {
    const setRecoilState = useSetRecoilState(atomFrameType);
    const navigate = useNavigate();
    const { useShowDrawer, DrawerCompoent } = TemporaryDrawer();
    const { showDrawer, setShowDrawer } = useShowDrawer();
    const [loginInfo, setLoginInfo] = useState<any>({});
    const [roomList, setRoomList] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const setSuccessOpen = useSetRecoilState(successMsgStatus);
    const setSuccessMsg = useSetRecoilState(successMsg);
    const setErrorOpen = useSetRecoilState(errorMsgStatus);
    const setErrorMsg = useSetRecoilState(errorMsg);
    const getList = () => {
        setLoading(true)
        getRoomList({}).then((res: any) => {
            if (res && res.data) {
                const {
                    errStatus,
                    message,
                    extra
                } = res.data
                if (errStatus === 0) {

                    setRoomList(extra.list)
                    //更新列表
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
            .finally(() => {
                setLoading(false)
            })

    }
    useEffect(() => {
        const autoLogin = localStorage.getItem("acghome_autoLogin");
        if (autoLogin) {
            try {
                setLoginInfo(JSON.parse(autoLogin as string))
            } catch (error) {
                setLoginInfo({})
                console.log(error)
            }
        }
        getList()
    }, [])
    const CreateForm = () => {
        const [roomName, setRoomName] = useState("")
        const [roomAbstract, setRoomAbstract] = useState("")
        const handleCreate = () => {
            if (!roomName) {
                setErrorMsg("房间名不可以为空!")
                setErrorOpen(true)
                return;
            }
            if (!roomAbstract) {
                setErrorMsg("房间简介不可以为空!")
                setErrorOpen(true)
                return;
            }
            const params = {
                roomName: roomName,
                openTime: "all",
                roomType: "public",
                abstract: roomAbstract,
                ownerUUid: loginInfo?.uuid,
            }
            createRoom(params).then((res: any) => {
                if (res && res.data) {
                    const {
                        errStatus,
                        message,
                        extra
                    } = res.data
                    if (errStatus === 0) {
                        setSuccessMsg(message);
                        setSuccessOpen(true);

                        setShowDrawer(false)
                        setRoomName("")
                        setRoomAbstract("")
                        getList()
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
        return (<Box
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "320px",
                padding: "8px 16px"
            }}
        >

            <TextField label={'封面'} disabled style={{ margin: 8, maxWidth: 200 }} />

            <TextField label={'*房间名'} style={{ margin: 8, maxWidth: 200 }}
                value={roomName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    // setRoomName(event.target.value.replaceAll(' ', ''));
                    setRoomName(event.target.value.replaceAll(' ', ''));
                }}
                onBlur={() => {
                    setRoomName((_roomName) => _roomName?.slice(0, 9))
                }} />

            <TextareaDefault placeholder="*简介" style={{ margin: 8 }} minRows={8}
                value={roomAbstract}
                onChange={(event: any) => {
                    setRoomAbstract(event.target.value);
                }}
                onBlur={() => {
                    setRoomAbstract((_roomAbstract) => _roomAbstract?.slice(0, 201))
                }} />
            <div>
                <Button onClick={() => handleCreate()}>提交</Button>
            </div>
        </Box>
        )
    }
    return (
        <div>
            {loginInfo?.uuid && <Button onClick={() => setShowDrawer(true)}>创建房间</Button>}
            <DrawerCompoent anchor="top">
                <CreateForm />
            </DrawerCompoent>
            <div className={"rooms-list flex flex-wrap mr-[-16px] mt-[-16px]"}>
                {loading ? <h3>loading……</h3> : roomList.map((item: any, index: number) => <RoomCard {...item} key={item?.id || index} />)}
            </div>
        </div>
    );
};

export default GroupList;
