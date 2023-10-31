import { Component } from 'react';
import './errorButton.css';

type IProps = object;

type IState = {
  hasError: boolean;
};

export class ErrorButton extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { hasError } = this.state;

    if (hasError) {
      throw new Error('Test error');
    }

    return (
      <button className="error-button" type="button" onClick={this.handleClick}>
        Throw Error
      </button>
    );
  }
}
