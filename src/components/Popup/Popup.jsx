import { Component } from 'react';
import './Popup.css';

class Popup extends Component {
  componentDidMount() {
    if(this.props.isActive) this.addEscKeyToClosePopupListener();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isActive && this.props.isActive) this.addEscKeyToClosePopupListener()
  }

  componentWillUnmount() {
    this.removeEscKeyToClosePopupListener()
  }
  
  handleEscKeyToCloseOverlay = ({ key }) => {
    if (key && key.toLowerCase() === 'escape') {
      this.close();
    } 
  }

  handleClickToClosePopup = ({ target }) => {
    if (target.dataset.canClosePopup) {
      this.close();
    }
  }

  addEscKeyToClosePopupListener() {
    document.addEventListener('keydown', this.handleEscKeyToCloseOverlay);
  }

  removeEscKeyToClosePopupListener() {
    document.removeEventListener('keydown', this.handleEscKeyToCloseOverlay);
  }

  close() {
    this.props.onClose();
    this.removeEscKeyToClosePopupListener()  
  }

  render() {
    const { isActive } = this.props;

    return (
      <div 
        className={`popup ${isActive ? 'popup_active' : ''}`}
        onClick={this.handleClickToClosePopup}
        data-can-close-popup={true}
      >
        <div className={`popup__content-wrap`} data-can-close-popup={true}>
          <button className="popup__close-btn" aria-label="Close" data-can-close-popup={true}></button>
          <div className="popup__main-content-wrap">
            <div className="popup__overflow-wrap">
                          {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;