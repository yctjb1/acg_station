1. 在泛型里加个 | null 就能给const定义的 ref里current赋值
2. react-router@v6 用useRoutes的写法可以方便一式两份的拿到所有路由列表。
子路由必须写成相对路由的形式才会有自动补全。
3. tailwind中，【似乎】不能把group-hover:border-red-500 拆成group-hover:和border-red-500,
比如`const activeColor = "border-red-500"; const groupHovor = "group-hover:" + activeColor;`,这种写法无法使hover生效