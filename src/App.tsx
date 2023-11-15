import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { DetailPage } from './pages/DetailPage';
import { MainPage } from './pages/MainPage';
import { Fallback } from './components/Fallback';
import { NotFound } from './components/NotFound';
import store from './store/store';

export const routes = createRoutesFromElements(
  <Route errorElement={<Fallback />}>
    <Route path="/" element={<MainPage />}>
      <Route path="detail/:id" element={<DetailPage />} />
    </Route>
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
