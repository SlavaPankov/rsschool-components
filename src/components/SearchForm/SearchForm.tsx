import { ChangeEvent, Component, FormEvent } from 'react';

type IProps = {
  onSubmit: (search: string) => void;
};

type IState = {
  search: string;
};

export class SearchForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      search: '',
    };
  }

  componentDidMount() {
    const { onSubmit } = this.props;
    const search = localStorage.getItem('search');

    this.setState({
      search: search || '',
    });

    if (search) {
      onSubmit(search);
    }
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: event.target.value,
    });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { search } = this.state;
    const { onSubmit } = this.props;

    localStorage.setItem('search', search);

    onSubmit(search);
  };

  render() {
    const { search } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="search"
          value={search}
          onChange={this.handleChange}
          placeholder="May the force be with you"
        />
        <button type="submit">search</button>
      </form>
    );
  }
}
