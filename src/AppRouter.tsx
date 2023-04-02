import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import Profile from './components/Profile';

const AppRouter = () => {
    return (
      <Router>
        <Routes>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    );
  };

export default AppRouter;