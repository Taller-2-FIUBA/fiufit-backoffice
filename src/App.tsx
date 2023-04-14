import './App.scss';
import AppRouter from './AppRouter';
import Navigator from './components/Navigator/Navigator';

function App() {
  return (
    <div className="App">
      <Navigator></Navigator>
      <AppRouter></AppRouter>
    </div>
  );
}

export default App;
