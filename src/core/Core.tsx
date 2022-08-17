import React from "react";
import { Routes, Route } from "react-router-dom";

import FeaturePage from "./FeaturePage";
import LandingPage from "./LandingPage";
import Login from "./Login";

export const Core = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/feature/*" element={<FeaturePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/:token" element={<Login />} />
    </Routes>
  );
};
