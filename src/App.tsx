import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { MainPage } from './pages/MainPage';
import { Fallback } from './components/Fallback';
import { NotFound } from './components/NotFound';
import { UncontrolledPage } from './pages/UncontrolledPage';
import { ReactHookPage } from './pages/ReactHookPage';
import store from './store/store';

export const routes = createRoutesFromElements(
  <Route errorElement={<Fallback />}>
    <Route path="/" element={<MainPage />} />
    <Route path="/uncontrolled" element={<UncontrolledPage />} />
    <Route path="/react-hook-form" element={<ReactHookPage />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

const router = createBrowserRouter(routes);

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
