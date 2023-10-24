import { Component } from 'react';
import { IPerson } from '../../types/IPerson';

type IProps = {
  list: IPerson[];
};

type IState = object;

export class ResultList extends Component<IProps, IState> {
  render() {
    const { list } = this.props;

    return (
      <ul>
        {list.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    );
  }
}
