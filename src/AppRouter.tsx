import { BrowserRouter as Router } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router';
import Profile from './components/profile/Profile';
import Users from './components/users/Users';

const AppRouter = () => {
    return (
      <Router>
        <Routes>
        <Route path='/' element={<Navigate to='/users' />} />
          <Route path="/users" element={<Users/>} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </Router>
    );
  };

export default AppRouter;