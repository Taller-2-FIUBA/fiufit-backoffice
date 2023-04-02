import React from 'react';
import logo from './logo.png';
import './App.css';
import Users from './components/Users'
import Profile from './components/Profile';

const user ={name: "Val", email: "valeria.mrb@gmail.com"};
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Users />
      <Profile user={user}/>
    </div>
  );
}

export default App;
