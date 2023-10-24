import { Component } from 'react';
import './resultItem.css';

type IProps = {
  name: string;
  birthDate: string;
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: string;
};

type IState = object;

export class ResultItem extends Component<IProps, IState> {
  render() {
    const { name, birthDate, eyeColor, gender, hairColor, height } = this.props;

    return (
      <li className="item">
        <h3 className="item-heading">{name}</h3>
        <ul className="info-list">
          <li className="info-item">
            <span className="info-name">Date of Birth:</span>
            <span className="info-value">{birthDate}</span>
          </li>
          <li className="info-item">
            <span className="info-name">Eye color:</span>
            <span className="info-value">{eyeColor}</span>
          </li>
          <li className="info-item">
            <span className="info-name">Gender:</span>
            <span className="info-value">{gender}</span>
          </li>
          <li className="info-item">
            <span className="info-name">Hair color:</span>
            <span className="info-value">{hairColor}</span>
          </li>
          <li className="info-item">
            <span className="info-name">Height:</span>
            <span className="info-value">{height}</span>
          </li>
        </ul>
      </li>
    );
  }
}
