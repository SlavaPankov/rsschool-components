import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { DetailPage } from './pages/DetailPage';
import { RootLayout } from './layout/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="detail/:id" element={<DetailPage />} />
    </Route>
  )
);

export function App() {
  return <RouterProvider router={router} />;
}
