import { BrowserRouter as Router } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router';
/* import Profile from './components/profile/Profile'; */
import Users from './components/users/Users';
import LoginScreen from "./components/login/Login";
import Admins from "./components/admins/Admins";
import Trainings from './components/trainings/Trainings';
import Metrics from './components/metrics/Metrics';
import Navigator from './components/navigator/Navigator';

const AppRouter = () => {
    return (
      <Router>
        <Navigator></Navigator>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/users" element={<Users/>} />
          {/* <Route path="/profile/:userId" element={<Profile />} /> */}
          <Route path="/admins" element={<Admins />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/metrics" element={<Metrics />} />
          {/* <Route path="/training/:trainingId" element={<Profile />} /> */}
        </Routes>
      </Router>
    );
  };

export default AppRouter;
