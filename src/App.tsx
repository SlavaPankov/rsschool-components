import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { DetailPage } from './pages/DetailPage';
import { MainPage } from './pages/MainPage';
import { Fallback } from './components/Fallback';
import { NotFound } from './components/NotFound';

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
  return <RouterProvider router={router} />;
}
