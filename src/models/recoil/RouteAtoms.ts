import {
    RecoilRoot,
    atom,
    selector,
} from "recoil";

export const pageErrorCode = atom<number | string>({
    key: "pageErrorCode", // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
});
export const atomRoutes = atom<any>({
    key: "atomRoutes",
    default: [],
});
export const atomRoutesFilter = atom<
    "meta-named" | "meta-all" | "flat-named" | "flat-all" | "flat-named-noerr" | "nav"
>({
    key: "atomRoutesFilter",
    default: "nav",
});

export const atomNoNavPath = atom<any>({
    key: "atomNoNavPath",
    default: [
        "/web/login",
        "/web/setting",
        "/web/newpassword",
        "/web/register",
        "/web/zone/:nameplate"
    ],
});

export const filteredAtomRoutes = selector({
    key: "filteredAtomRoutes",
    get: ({ get }) => {
        const filter = get(atomRoutesFilter);
        const noNavPath = get(atomNoNavPath);
        const routerList = get(atomRoutes);//带层级关系的所有原始路由
        const webChildren = routerList?.[0]?.children?.[1]?.children || []

        const getFlattenRoutes = () => {
            const flatRoutes: any[] = [];
            const flattenRoutes = (routes: any, prefix: string) => {
                for (const route of routes) {
                    const path = route.path;
                    // const absPath =
                    //     prefix && prefix !== "/" ? `${prefix}/${path}` : path;
                    const absPath = path;
                    flatRoutes.push({
                        ...route,
                        path: absPath,
                    });

                    if (route.children) {
                        flattenRoutes(route.children, absPath);
                    }
                }
            };
            flattenRoutes(routerList, "");
            return flatRoutes;
        };
        const defaultNoShow = [""]
        const filterResult = (filter: any) => {
            switch (filter) {
                case "nav":
                    return (
                        webChildren.filter(
                            (item: any) => ![
                                ...defaultNoShow,
                                ...noNavPath
                            ].includes(item.path)
                        ) || []
                    );
                case "meta-named":
                    return (
                        webChildren.filter(
                            (item: any) => !defaultNoShow.includes(item.path)
                        ) || []
                    );
                case "meta-all":
                    return webChildren || [];
                case "flat-named":
                    return getFlattenRoutes().filter(
                        (item: any) => !defaultNoShow.includes(item.path)
                    ); //剔除了/、*
                case "flat-all":
                    return getFlattenRoutes();
                case "flat-named-noerr":
                    return getFlattenRoutes().filter(
                        (item: any) =>
                            !defaultNoShow.includes(item.path) &&
                            !item.path.startsWith("/error")
                    );
                default:
                    return routerList;
            }
        }
        const filteredAtomRoutesState = filterResult(filter);
        const navAtomRoutesState = filterResult("nav");
        const filterAllAtomRoutesState: any = {};//诸如/web/home 这样键值对组成的所有具名obj
        getFlattenRoutes().map((item: any) => {
            if (!["/", "*", "/web"].includes(item.path) && item.path && item.name) {
                const key = item.path;
                filterAllAtomRoutesState[key] = item.name;
            }
        });
        const defaultFlattenRoutes = getFlattenRoutes();
        return {
            filteredAtomRoutesState,//暂时弃用
            navAtomRoutesState,
            filterAllAtomRoutesState,
            defaultFlattenRoutes,
            routerList
        };
    },
});
