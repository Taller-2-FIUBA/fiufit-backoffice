import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";
import Profile from "./components/profile/Profile";
import Users from "./components/users/Users";
import LoginScreen from "./components/admins/Login";
import Admins from "./components/admins/Admins";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/admins" element={<Admins />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
