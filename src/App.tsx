import { Component } from 'react';
import { SearchForm } from './components/SearchForm';
import { Heading } from './components/Heading';
import { IPerson } from './types/IPerson';
import { ResultList } from './components/ResultList';

type IProps = object;

type IState = {
  results: IPerson[];
};

export class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      results: [],
    };
  }

  handleSubmit = async (search: string) => {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${search.trim()}`
    );
    const { results }: { results: IPerson[] } = await response.json();
    this.setState({ results });
  };

  render() {
    const { results } = this.state;

    return (
      <>
        <Heading />
        <SearchForm onSubmit={this.handleSubmit} />
        <ResultList list={results} />
      </>
    );
  }
}
