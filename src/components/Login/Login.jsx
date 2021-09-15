import React from "react";

import PrimaryFormWrap from "../PrimaryFormWrap/PrimaryFormWrap";
import Popup from "../Popup/Popup";

import fields from '../../utils/formFieldsMetadata';
import { Redirect } from "react-router-dom";


function Login(props) {
  const { registrationPath, isReadyToLogin, history, location, isLoggedIn } = props;

  const formInfo = {
    formName: 'sign-in-form',
    heading: 'Sign in',
    submitBtnLabel: 'Sign in',
    submitBtnLabelWhenSubmitting: 'Signing in',
    fields: [
      fields.email,
      fields.password,
    ],
  };

  const  registrationLink = {
    path: registrationPath,
    text: 'Sign up',
  };

  async function onLogin(userDetails) {
    await props.onLogin(userDetails);
    history.replace('/');

    // no catch block because component is not responsible for handling errors
  }

  function onClose() {
    history.push('/');
  }

  // if user is signed in but is directed to login path, then they should be redirected
  // to their intended location or home.
  if(isLoggedIn && isReadyToLogin) {
    let locationTogoTo;
    if (location.state && location.state.intendedPath) locationTogoTo = location.state.intendedPath; 
    else locationTogoTo = '/';

    return <Redirect to={locationTogoTo} />
  }

  // if user is signed in but not on the login path, do not render anything
  if(isLoggedIn) return null;

  // if user is not signed in, render the following
  return (
  <>
    <Popup isActive={isReadyToLogin} onClose={onClose}>
      <PrimaryFormWrap
        formInfo={formInfo}
        link={registrationLink}
        onSubmit={onLogin}
        shouldReset={isReadyToLogin}
      />
    </Popup>
  </>
  );
}

export default Login;