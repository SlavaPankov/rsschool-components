import { Component } from 'react';
import { SearchForm } from './components/SearchForm';
import { Heading } from './components/Heading';
import { IPerson } from './types/IPerson';
import { ResultsList } from './components/ResultsList';
import { Loader } from './components/Loader';

type IProps = object;

type IState = {
  results: IPerson[];
  isLoading: boolean;
};

export class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
    };
  }

  handleSubmit = async (search: string) => {
    this.setState({ isLoading: true });
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${search.trim()}`
    );
    const { results }: { results: IPerson[] } = await response.json();
    this.setState({ results, isLoading: false });
  };

  render() {
    const { results, isLoading } = this.state;

    return (
      <>
        <Heading />
        <SearchForm onSubmit={this.handleSubmit} />
        {isLoading ? <Loader /> : <ResultsList list={results} />}
      </>
    );
  }
}
