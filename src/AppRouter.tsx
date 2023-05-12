import { BrowserRouter as Router } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router';


import Users from './components/users/Users';
import LoginScreen  from './components/login/Login';
import Admins from './components/admins/Admins';
import Trainings from './components/trainings/Trainings';
import Metrics from './components/metrics/Metrics';
import Navigator from './components/navigator/Navigator';
import PrivateRoutes from './guard/PrivateRoutes';

const AppRouter = () => {
    return (
      <Router>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path='/' element={<Navigate to='/login' />} />
            <Route path='*' element= {
              <>
                <Navigator/>
                <Routes>
                  <Route element={<PrivateRoutes/>}>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/admins" element={<Admins />} />
                    <Route path="/trainings" element={<Trainings />} />
                    <Route path="/metrics" element={<Metrics />} />
                  </Route>
                </Routes>
              </>
              }/>
          </Routes>
      </Router>
    );
  };

export default AppRouter;
