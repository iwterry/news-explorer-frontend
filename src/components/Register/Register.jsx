import React from "react";

import PrimaryFormWrap from "../PrimaryFormWrap/PrimaryFormWrap";
import Popup from "../Popup/Popup";

import fields from '../../utils/formFieldsMetadata';
import RegistrationSuccess from "../RegistrationSuccess/RegistrationSuccess";

function Register(props) {
  const { loginPath, isReadyToRegister, history } = props;

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