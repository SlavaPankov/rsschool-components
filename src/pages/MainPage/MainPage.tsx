import { NavLink } from 'react-router-dom';
import { Heading } from '../../components/Heading';
import './mainPage.css';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Datalist } from '../../components/DataList';

export function MainPage() {
  const { data } = useAppSelector((state) => state.formData);

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
      <div className="listWrapper">
        <Datalist list={data} title="Submitted data" />
      </div>
    </>
  );
}
