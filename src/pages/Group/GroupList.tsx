import React, { useEffect } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { atomFrameType } from "models/index";
import { useParams, useNavigate } from 'react-router-dom';


const GroupList = () => {
    const setRecoilState = useSetRecoilState(atomFrameType);
    const navigate = useNavigate();

    return (
        <div>

            <div>
                这里是部落列表，<a onClick={() => {
                    navigate("/web/group/1")
                }}>去部落1</a>
            </div>
        </div>
    );
};

export default GroupList;
