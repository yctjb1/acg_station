import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate  } from 'react-router-dom';
import NotFoundPage from "pages/NotFoundPage"
import Home from "pages/Home"
const TopRouter = () => {
    return  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />}/>
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/404" element={<NotFoundPage />} />
    </Routes>
  </Router>
}

export default TopRouter;