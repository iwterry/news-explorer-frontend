import { Component } from "react";
import './Overlay.css';

class Overlay extends Component {
  activeOverlayClassName = 'overlay_active';
  classNameForElementToHide = 'overlay__element-for-hiding';

  componentDidMount() {
    if(this.props.isOverlayActive) this.addEscKeyToHideOverlayListener();
    
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isOverlayActive && this.props.isOverlayActive) this.addEscKeyToHideOverlayListener()
  }

  componentWillUnmount() {
    this.removeEscKeyToHideOverlayListener()
  }
  
  handleEscKeyToHideOverlay = ({ key }) => {


    if (key && key.toLowerCase() === 'escape') {
      console.log('closing using esc');
      this.hide();
    } 
  }

  handleClickToHideOverlay = ({ target }) => {
    if (
      target.classList.contains(this.activeOverlayClassName)
      || target.classList.contains(this.classNameForElementToHide)
    ) {
     this.hide();
    }
  }

  addEscKeyToHideOverlayListener() {
    document.addEventListener('keydown', this.handleEscKeyToHideOverlay);
  }

  removeEscKeyToHideOverlayListener() {
    document.removeEventListener('keydown', this.handleEscKeyToHideOverlay);
  }

  hide() {
    this.props.onHide();
    this.removeEscKeyToHideOverlayListener()  
  }

  render() {

    const { 
      isHidingSelfWhenOverlayNotActive=false,
      isOverlayActive=false,
      Component,
      componentProps={},
     } = this.props;

    let overlayClassNames = 'overlay';
    if (isOverlayActive) {
      overlayClassNames += ' overlay_active';
    } else if (isHidingSelfWhenOverlayNotActive) {
      overlayClassNames += ' overlay_hide-self';
    }

    return (

        <Component 
          overlay={{
            classNames: overlayClassNames,
            classNameForElementToHide: this.classNameForElementToHide,
            handleClick: this.handleClickToHideOverlay,
          }} 
          {...componentProps}
        />

    );
  }
}

export default Overlay;