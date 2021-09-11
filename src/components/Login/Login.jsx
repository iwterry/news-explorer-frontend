import React from "react";

import PrimaryFormWrap from "../PrimaryFormWrap/PrimaryFormWrap";
import Popup from "../Popup/Popup";
import Overlay from "../Overlay/Overlay";

import fields from '../../utils/formFieldsMetadata';


function Login(props) {
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
    path: '/sign-up',
    text: 'Sign up',
  };

  // TODO: the states and handleSubmit are in testing phases and will be removed in the future
  // as well as the <button> element
  const [ isOverlayActive, setIsOverlayActive ] = React.useState(true); 
  const [ shouldReset, setShouldReset ] = React.useState(false);
 
  const handleSubmit = () => {
    console.log('submitting');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
              resolve('okay');
      setIsOverlayActive(false);
      }, 2000);
    });
  };

  const popupProps = {
    children: (
      <PrimaryFormWrap
        formInfo={formInfo}
        link={registrationLink}
        onSubmit={handleSubmit}
        shouldReset={shouldReset}
      />
    ),
  };

  return (
  <>
    {/* TODO: button only used for testing purposes */}
    <button  onClick={() => {
      setIsOverlayActive(true);
      setShouldReset(false);
    }}>
      testing
    </button>
    <Overlay 
      Component={Popup} 
      isOverlayActive={isOverlayActive} 
      isHidingSelfWhenOverlayNotActive={true} 
      onHide={() => {
        setIsOverlayActive(false);
        setShouldReset(true);
      }}
      componentProps={popupProps}
    />
  </>
  );
}

export default Login;