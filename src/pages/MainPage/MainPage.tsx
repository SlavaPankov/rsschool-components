import { NavLink } from 'react-router-dom';
import { Heading } from '../../components/Heading';
import './mainPage.css';

export function MainPage() {
  return (
    <>
      <Heading />
      <ul>
        <li>
          <NavLink to="/uncontrolled">Uncontrolled form</NavLink>
        </li>
        <li>
          <NavLink to="/react-hook-form">React hook form</NavLink>
        </li>
      </ul>
    </>
  );
}
