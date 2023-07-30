# acg_station
a try, use vite + material-ui + tailwind + recoil, to make a comic catalogue and other balabala
目标：功能方便，打算弄个漫画目录（表的），主页的话练练tailwind和material-ui，就参考https://www.jpl.nasa.gov/的网站了

后端用sails，因为考虑学习websocket，可以先整个在线聊天室
备注：vite的打包不能直接运行，需要npm install -g serve ，安装服务器环境。 接着输入serve -s dist -l 5173，即可运行代码(服务器上是80)

关于打包后前端路由丢失以及刷新白页、以及serve.json的问题，翻阅同目录下的`devwolfNodeBook.md`文件

# 如何与sails.js对接？
前端在一个端口上，而sails.js后端在另一个端口上。

# 正在处理的问题：
目前的路由结构CommonFrameContainer会渲染2次。需要整改路由————不需要整改，原因是开了严格模式。


# 难点预估
sails写聊天室方案是否可行（是否搜索解决方案的关键字就是这个？）————权限功能实装前，增加一个一键关闭聊天室的方案

手机号注册禁用，改成邮箱

重新安装一下数据库相关东西，重新租一个轻量服务器

# 目标想法
晚间房间和早间房间、加密房间？

# 版本相关
node 14运行的话，记得pnpm用7.29.1版
