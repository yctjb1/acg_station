import React from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { atomFrameType } from "models/index";


const Home = () => {
    const setRecoilState = useSetRecoilState(atomFrameType);

    return (
        <div>

            <div>
                <h2>开发者笔记(技术栈总结)</h2>
                <h3>前端:</h3>
                <ul>
                    <li><b>vite</b>按照react + tsx模板搭建的， css预处理器配置的是less</li>
                    <li>加入了<b>tailwind</b>，早就想试试所谓原子化css，因为没什么ui方向，用现成的css排列组合了</li>
                    <li>react的ui框架找了<b>material-ui</b>，之前只主力接触过antd3~5，发现material-ui也可以配置的和tailwind组合</li>
                    <li>状态管理使用的<b>recoil</b> （乍一看hooks味很足就用了这个）</li>
                </ul>
                <h3>后端:</h3>
                <ul>
                    <li>之前一直用的express满足需求，因为这次待业期发现websocket的提问率还蛮高的，反正我一直没接触过兴趣也不大，因此用chat查了个自带相关插件的框架————<b>sails.js</b></li>
                    <li>数据库用的mysql,而且session持久化也备份在那里面。多亏sails自己首次接触js里的orm，它的waterline还挺好用的</li>
                    <li>sails.js没找到更好的把session创建连数据库的插件，用的express-mysql-session，明明已经有sails-mysql这个把model连数据库的适配器了。官方倒是说express能用的插件都支持，当时选sails也算看上这点吧</li>
                    <li>uuid生成用的<b>nanoid</b>，种子生成加了seedrandom</li>
                </ul>
                <h3>ui:</h3>
                <ul>
                    <li>响应式后面有空再弄，抓紧丰富demo搞投简历</li>

                    <li>[2023/08/17]：sails.js探索先告一段落吧，抓紧给页面弄点好看的炫技？</li>
                </ul>
                <h3>功能:</h3>
                <ul>
                    <li>用户登录注册、然后就是建房聊天（数据我后有更新的时候随时会清空）。</li>
                    <li>[2023/08/17]：裸辞快四个月咯，压力到了一个瓶颈，还好没跨，补充了点正能量后姑且解决了部署后"https://localhost:1337/__getcookie net::ERR_CONNECTION_CLOSED问题",
                        需要io.current.sails.useCORSRouteToGetCookie = false;详情可以可以翻我github上前端项目里的笔记devwolfNodeBook.md</li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
