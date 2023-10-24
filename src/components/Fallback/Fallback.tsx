import { Component } from 'react';
import './fallback.css';

export class Fallback extends Component<object, object> {
  render() {
    return (
      <div className="fallback">
        <h1>Oops! Something goes wrong...</h1>
        <button type="button" onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    );
  }
}
