import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
export const pageErrorCode = atom<number | string>({
    key: 'pageErrorCode', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});
export const atomRoutes = atom<any>({
    key: 'atomRoutes', // unique ID (with respect to other atoms/selectors)
    default: [],
});
export const atomRoutesFilter = atom<"meta-named"|"meta-all"|"flat-named"|"flat-all"|"flat-named-noerr">({
    key: 'atomRoutesFilter', // unique ID (with respect to other atoms/selectors)
    default: "meta-named",
});

export const filteredAtomRoutes = selector({
    key: 'filteredTodoListState',
    get: ({get}) => {
      const filter = get(atomRoutesFilter);
      const routerList = get(atomRoutes);


    const getFlattenRoutes = () => {
        const flatRoutes: any [] = [];
        const flattenRoutes = (routes: any, prefix: string) => {
          for (const route of routes) {
              const path = route.path;
              const absPath = prefix ? `${prefix}/${path}` : path;
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
    }

      switch (filter) {
        case 'meta-named':
          return routerList.filter((item: any) => !["/","*"].includes(item.path));
        case 'meta-all':
          return routerList;
        case 'flat-named':
          return getFlattenRoutes().filter((item: any) => !["/","*"].includes(item.path));//剔除了/、*
        case 'flat-all':
          return getFlattenRoutes();
        case 'flat-named-noerr':
          return getFlattenRoutes().filter((item: any) => !["/","*"].includes(item.path) && !item.path.startsWith("/error"));
        default:
          return routerList;
      }
    },
  });