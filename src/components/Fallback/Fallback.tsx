import './fallback.css';

export function Fallback() {
  return (
    <div className="fallback">
      <h1>Oops! Something goes wrong...</h1>
      <button type="button" onClick={() => window.location.reload()}>
        Reload
      </button>
    </div>
  );
}
