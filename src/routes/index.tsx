import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Home from "pages/Home";
import DevHome from "pages/DevHome";
import UIHome from "pages/DevHome/UIHome";
import TestSkill from "pages/DevHome/TestSkill";
import ErrorPage from "pages/ErrorPage";
import NotFoundPage from "pages/ErrorPage/NotFoundPage";
const TopRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dev" element={<DevHome />}>
                    <Route path="ui" element={<UIHome />} />
                    <Route path="test_skill" element={<TestSkill />} />
                </Route>
                <Route path="*" element={<Navigate to="/error?code=404" />} />
                <Route path="/error" element={<ErrorPage />}>
                    <Route path="404" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default TopRouter;
