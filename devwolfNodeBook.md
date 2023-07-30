# 1. 在泛型里加个 | null 就能给const定义的 ref里current赋值
# 2. react-router@v6 用useRoutes的写法可以方便一式两份的拿到所有路由列表。
子路由必须写成相对路由的形式才会有自动补全。（现在为了防止vite打包后前端路由丢失，相对路由全写成了完整路由，未确定是这个原因）
# 3. tailwind中，【似乎】不能把group-hover:border-red-500 拆成group-hover:和border-red-500,
比如`const activeColor = "border-red-500"; const groupHovor = "group-hover:" + activeColor;`,这种写法无法使hover生效
# 4. Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html".
vite打包后的项目用serve运行后刷新会丢失前端路由。
经过半天排查，首先vite.config.ts里面的base得从"./"得改成'/'。
SPA单页面启动server得用`serve -s dist -l 5173` 这样加-s参数
如果要改一些配置需要`serve -s -l 5173 --config serve.json`,此时
serve.json和dist文件夹同级
{
    "public": "dist",
    "rewrites": [
        {
            "source": "**",
            "destination": "/index.html"
        }
    ],
    "trailingSlash": true
}
不过，问题的重点不是serve.json，还是上面改base

# 5.github提交
GsouCloud的代理是走的17890端口，所以出现`fatal: unable to access 'https://github.com/yctjb1/acg_station.git/': Failed to connect to github.com port 443: Timed out`的时候添加下面两段
git config --global http.proxy http://127.0.0.1:17890
git config --global https.proxy http://127.0.0.1:17890