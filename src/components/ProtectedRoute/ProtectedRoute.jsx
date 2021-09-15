import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, path, Component, loginPath, componentProps }) {
  if (isLoggedIn) {
    return (
      <Route
        path={path}
        render={(routeComponents) => (
          <Component {...routeComponents} {...componentProps} /> 
        )}
      />
    );
  }      
  return (
    <Redirect path={loginPath} />
  );
}

export default ProtectedRoute;