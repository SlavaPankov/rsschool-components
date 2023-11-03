import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { DetailPage } from './pages/DetailPage';
import { MainPage } from './pages/MainPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainPage />}>
      <Route path="detail/:id" element={<DetailPage />} />
    </Route>
  )
);

export function App() {
  return <RouterProvider router={router} />;
}
