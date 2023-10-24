import { Component } from 'react';
import { IPerson } from '../../types/IPerson';
import './resultsList.css';
import { ResultItem } from './ResultItem/ResultItem';

type IProps = {
  list: IPerson[];
};

type IState = object;

export class ResultList extends Component<IProps, IState> {
  render() {
    const { list } = this.props;

    return (
      <ul className="list">
        {list.map((item) => (
          <ResultItem
            key={item.name}
            name={item.name}
            birthDate={item.birth_year}
            eyeColor={item.eye_color}
            gender={item.gender}
            hairColor={item.hair_color}
            height={item.height}
          />
        ))}
      </ul>
    );
  }
}
