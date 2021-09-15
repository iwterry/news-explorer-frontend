import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, path, Component, loginPath, componentProps }) {
  console.log('accessed protected route', path, isLoggedIn);
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
    <Redirect to={{
      pathname: loginPath,
      state: { intendedPath: path }
    }} />
  );
}

export default ProtectedRoute;