import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosRequest } from "constants/index";
import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
//需要定义一足够抽象的房间表

const TestSkill = () => {
    const [demoData, setDemoData] = React.useState<string | undefined>(undefined);
    const io = React.useRef<any>(null);
    const socket = React.useRef<any>(null);
    useEffect(() => {
        // Instantiate the socket client (`io`)
        try {
            io.current = sailsIOClient(socketIOClient);
            io.current.sails.url = 'http://localhost:1337';
            if (io.current.socket.isConnected()) {//?
                io.current.socket.disconnect();
            }
            io.current.sails.autoConnect = false;
            io.current.sails.reconnection = true;

            //io.current.sails.environment = 'production';// Disable logger in sails.io.js client
            socket.current = io.current.sails.connect();
            socket.current.on('message', (msg: any) => {
                console.log("【message】msg")
                console.log(msg.action)
            });

        } catch (error) {
            console.log(error)
        }
        // 在组件卸载时清理 io
        return () => {
            // autoConnect = true时的写法，false的时候该用socket
            // if (io.current) {
            //     if (io.current.socket.isConnected()) {
            //         io.current.socket.disconnect();
            //     }
            // }
            if (socket.current) {
                if (socket.current.isConnected()) {
                    socket.current.disconnect();
                }

                socket.current.off('message', () => { console.log("socket监听已关闭") });
            }
        };
    }, [])

    const subscribe = () => {
        if (socket.current) {

            socket.current.get('/api/v1/socket/subscribe', (data: any, jwRes: any) => {
                console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
            });
        }
    }

    const broadcast = () => {
        // '/api/v1/socket/broadcast'

    }
    const unsubscribe = () => {
        // '/api/v1/socket/unsubscribe'
    }

    return <div>
        测试功能
        <a href="http://bgm.tv" title="Bangumi 番组计划"><img src="http://bgm.tv/img/ico/bgm_banner.gif" alt="" /></a>
        <div>
            websocket<br />
            <button disabled onClick={() => {
                // subscribe()
            }}>subscribe</button>
            <button disabled onClick={() => {
                // broadcast()
            }}>broadcast</button>
            <button disabled onClick={() => {
                // unsubscribe()
            }}>unsubscribe</button>
        </div>
    </div>
}

export default TestSkill;