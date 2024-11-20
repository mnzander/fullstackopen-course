import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { UserProvider } from './contexts/UserContext'; // Importa el proveedor
import { BrowserRouter as Router } from 'react-router-dom'; // Importar Router
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </QueryClientProvider>
);
