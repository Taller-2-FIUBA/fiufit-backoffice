import logo from './logo.png';
import './App.scss';
import Users from './components/users/Users';
import Profile from './components/profile/Profile';
/* import Navigator from './components/navigator/Navigator'; */

const user ={name: "Val", email: "valeria.mrb@gmail.com"};
function App() {
  return (
    <div className="App">
      <Users />
    </div>
  );
}

export default App;
