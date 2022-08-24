import React from 'react';
import { Routes, Route } from 'react-router-dom';

import About from '../about/About';
import NewList from '../new-list/NewList';
import SavedLists from '../saved-lists/SavedLists';
import FeaturePage from './FeaturePage';
import LandingPage from './LandingPage';
import Login from './Login';

const Core = () => (
  <Routes>
    <Route index element={<LandingPage />} />
    <Route path="feature" element={<FeaturePage />}>
      <Route index element={<NewList />} />
      <Route path="savedLists" element={<SavedLists />} />
      <Route path="about" element={<About />} />
    </Route>
    <Route path="login" element={<Login />} />
    <Route path="login/:token" element={<Login />} />
  </Routes>
);

export default Core;