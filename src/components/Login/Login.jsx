import React from "react";

import PrimaryFormWrap from "../PrimaryFormWrap/PrimaryFormWrap";
import Popup from "../Popup/Popup";

import fields from '../../utils/formFieldsMetadata';


function Login(props) {
  const { registrationPath, isReadyToLogin, history } = props;

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
    console.log('onlogin');
    history.replace('/');

    // no catch block because component is not responsible for handling errors
  }

  function onClose() {
    history.push('/');
  }

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