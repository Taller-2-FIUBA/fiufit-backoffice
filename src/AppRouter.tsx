import { BrowserRouter as Router } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router';
import Profile from './components/profile/Profile';
import Users from './components/users/Users';
import LoginScreen from "./components/login/Login";
import Admins from "./components/admins/Admins";
import Trainings from './components/trainings/Trainings';
import Metrics from './components/metrics/Metrics';

const AppRouter = () => {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/users" element={<Users/>} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/training/:trainingId" element={<Profile />} />
          <Route path="/metrics" element={<Metrics />} />
        </Routes>
      </Router>
    );
  };

export default AppRouter;
