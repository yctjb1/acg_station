import { useEffect, useState } from "react";
import BlockSimpleNav from "componets/Nav/BlockSimpleNav";
import { atomRoutesFilter, filteredAtomRoutes } from "models/index";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { useLocation, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';


interface IPathItem {
    path: string;
    name: string;
    element: any;
}
export const HomePageTopNav = () => {
    const [atomRoutesFilterState, setAtomRoutesFilter] =
        useRecoilState(atomRoutesFilter);
    const {
        navAtomRoutesState,
        filterAllAtomRoutesState,
    } = useRecoilValue(filteredAtomRoutes);
    const location: any = useLocation();
    const pathname = location?.pathname || "";
    const [pageTitle, setPageTitle] = useState<string>("狼堡小站")
    const { groupId, nameplate } = useParams();
    useEffect(() => {
        const titlesObj: any = { ...filterAllAtomRoutesState };
        if (groupId) titlesObj[`/web/group/${groupId}`] = filterAllAtomRoutesState["/web/group/:groupId"];
        if (nameplate) titlesObj[`/web/zone/${nameplate}`] = filterAllAtomRoutesState["/web/zone/:nameplate"];
        if (titlesObj[pathname]) {
            setPageTitle(`${titlesObj[pathname]}-狼堡小站`)
        }

    }, [filterAllAtomRoutesState, pathname, groupId, nameplate])
    return (
        <>
            <BlockSimpleNav
                dataSource={navAtomRoutesState.map(
                    (item: { path: string; name: string; element: any }) => ({
                        label: item.name,
                        url: item.path,
                    })
                )}
                config={{ theme: "dark0", activeKey: "pathName" }}
            />
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

        </>
    );
};
