import { Link } from 'react-router-dom';
import './notFound.css';

export function NotFound() {
  return (
    <div className="notFound">
      <h1>Page not found</h1>
      <Link to="/">Go to main</Link>
    </div>
  );
}
