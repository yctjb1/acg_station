import React from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { atomFrameType } from "models/index";
const Home = () => {
    const setRecoilState = useSetRecoilState(atomFrameType);
    return (
        <div>
            我是首页！！！

        </div>
    );
};

export default Home;
