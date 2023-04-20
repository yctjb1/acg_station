import { useEffect } from "react";
import BlockSimpleNav from "componets/Nav/BlockSimpleNav";
import { atomRoutes, atomRoutesFilter, filteredAtomRoutes } from "models/index";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
export const HomePageTopNav = () => {
    const atomRoutesState = useRecoilValue(atomRoutes);
    const [atomRoutesFilterState, setAtomRoutesFilter] =
        useRecoilState(atomRoutesFilter);
    const filteredAtomRoutesState: {
        path: string;
        name: string;
        element: any;
    }[] = useRecoilValue(filteredAtomRoutes);

    return (
        <BlockSimpleNav
            dataSource={filteredAtomRoutesState.map(
                (item: { path: string; name: string; element: any }) => ({
                    label: item.name,
                    url: item.path,
                })
            )}
            config={{ theme: "dark0", activeKey: "pathName" }}
        />
    );
};
