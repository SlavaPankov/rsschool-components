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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<Fallback />}>
      <Route path="/" element={<MainPage />}>
        <Route path="detail/:id" element={<DetailPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export function App() {
  return <RouterProvider router={router} />;
}
