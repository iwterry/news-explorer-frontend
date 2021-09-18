import React from "react";
import { Redirect } from "react-router-dom";

import PrimaryFormWrap from "../PrimaryFormWrap/PrimaryFormWrap";
import Popup from "../Popup/Popup";
import RegistrationSuccess from "../RegistrationSuccess/RegistrationSuccess";

import fields from '../../utils/formFieldsMetadata';

function Register(props) {
  const { loginPath, isReadyToRegister, history, isLoggedIn } = props;

  const formInfo = {
    formName: 'sign-up-form',
    heading: 'Sign up',
    submitBtnLabel: 'Sign up',
    submitBtnLabelWhenSubmitting: 'Signing up',
    fields: [
      fields.email,
      fields.password,
      fields.username,
    ],
  };

  const  loginLink = {
    path: loginPath,
    text: 'Sign in',
  };

  const [ hasRegistered, setHasRegistered ] = React.useState(false);

  async function onRegister(userDetails) {
    await props.onRegister(userDetails);
    setHasRegistered(true);
  }

  function onClose() {
    history.push('/');
  }


  // do not render registration-related popups when the user is already signed in
  if (isLoggedIn) {
    // since they are signed in, there is no need to register, 
    // so direct them to home when they seek to register
    if (isReadyToRegister) return <Redirect to="/" />;
    else return null;
  }

  return (
  <>
    <Popup isActive={isReadyToRegister && !hasRegistered} onClose={onClose}>
      <PrimaryFormWrap
        formInfo={formInfo}
        link={loginLink}
        onSubmit={onRegister}
        shouldReset={isReadyToRegister}
      />
    </Popup>

    <Popup isActive={isReadyToRegister && hasRegistered} onClose={onClose}>
      <RegistrationSuccess loginPath={loginPath} />
    </Popup>
  </>
  );
}

export default Register;