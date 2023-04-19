import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-blue-200 h-screen">
            <Button variant="contained" onClick={() =>navigate("/modules")}>跳转SimpleList</Button>
        </div>
    );
};

export default Home;
