import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.scss';
import AppRouter from './AppRouter';
import Navigator from './components/Navigator/Navigator';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navigator></Navigator>
        <AppRouter></AppRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
