import './AppError.css';

function AppError({ additionalCssClassNamesStr='' }) {
  return (
    <div className={`${additionalCssClassNamesStr} app-error`}>
      <span className="app-error__heading">Error</span>
      <p className="app-error__message">
        Sorry, something went wrong during the request. There may be a connection issue
        or the server may be down. Please try again later.
      </p>
    </div>
  );
}

export default AppError;