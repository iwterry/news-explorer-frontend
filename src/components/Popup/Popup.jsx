import './Popup.css';

function Popup(props) {
  return (
    <div className={`${props.overlay.classNames} popup`} onClick={props.overlay.handleClick}>
      <div className={`${props.overlay.classNameForElementToHide} popup__content-wrap`}>
        <button className={`${props.overlay.classNameForElementToHide} popup__close-btn`} aria-label="Close"></button>
        <div className="popup__main-content-wrap">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Popup;