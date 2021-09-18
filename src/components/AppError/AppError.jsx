import './AppError.css';

function AppError({ additionalCssClassNamesStr='', isUsedInPopup=false, message }) {
  const errorMessage = message || (
    'Sorry, something went wrong during the request. There may be a connection issue ' + 
    'or the server may be down. Please try again later.'
  );

  return (
    <div className={`${additionalCssClassNamesStr} app-error ${isUsedInPopup ? 'app-error_popup': ''}`}>
      <span className="app-error__heading">Error</span>
      <p className="app-error__message">{errorMessage}</p>
    </div>
  );
}

export default AppError;