import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { User } from './api/UsersService';
import Profile from './components/profile/Profile';
import Users from './components/users/Users';

const AppRouter = () => {
    const user: User = {
        firstName: '',
        lastName: '',
        email: '',
        registrationDate: '',
        role: ''
    };
    return (
      <Router>
        <Routes>
          <Route path="/users" element={<Users/>} />
          <Route path="/profile" element={<Profile user={user}/>} />
        </Routes>
      </Router>
    );
  };

export default AppRouter;