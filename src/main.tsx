import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Fallback } from './components/Fallback';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ErrorBoundary fallback={<Fallback />}>
      <App />
    </ErrorBoundary>
  </BrowserRouter>
);
