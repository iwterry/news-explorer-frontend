import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

import './Header.css'

class Header extends Component {
  state = {
    isMobileNavShown: false,
  };

  constructor(props) {
    super(props);
    this.collapseNavBtnRef = React.createRef();
    this.headerRef = React.createRef();
  } 

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKey);
  }

  handleExpandNav = () => {
    document.addEventListener('keydown', this.handleEscKey);
    this.setState({ isMobileNavShown: true });
  };

  handleCollapseNav = (event) => {
    const { target } = event;
    // Note: using Refs here instead of classnames or data attributes because I feel it is less brittle.
    if(
      (target === this.headerRef.current)
      || (target === this.collapseNavBtnRef.current)
      || target.dataset.canHideMobileNav
    ) {
      this.setState({ isMobileNavShown: false });
      document.removeEventListener('keydown', this.handleEscKey);
    }
  }

  handleEscKey = (event) => {
    const { key } = event;

    if(key && key.toLowerCase() === 'escape') {
      this.setState({ isMobileNavShown: false });
      document.removeEventListener('keydown', this.handleEscKey);
    }
  }

  getMenuButton() {
    const { isMobileNavShown } = this.state;
    const btnShownClassName = 'header__menu-btn_shown';
    let btnContent;
    let btnProps;
    
    if(isMobileNavShown) {
      btnProps = {
        className: `header__menu-btn ${isMobileNavShown ?  btnShownClassName : ''}`, 
        'aria-label': 'Collapse',
        onClick: this.handleCollapseNav,
        ref: this.collapseNavBtnRef,
      };

      btnContent = (
        <svg className="header__collapse-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true">
          <path d="M13.414 12l5.293 5.293-1.414 1.414-6-6a1 1 0 0 1 0-1.414l6-6 1.414 1.414L13.414 12z"/>
          <path d="M10.879 12l-5.293 5.293L7 18.707l6-6a1 1 0 0 0 0-1.414l-6-6-1.414 1.414L10.879 12z"/>
        </svg>
      );
    } else {
      btnProps = {
        className: `header__menu-btn header__menu-btn_expand-btn ${!isMobileNavShown ? btnShownClassName : ''}`,
        'aria-label': 'Expand',
        onClick: this.handleExpandNav,
      };

      btnContent = (
        <>
          <span className="header__hamburger-line"></span>
          <span className="header__hamburger-line"></span>
        </>
      )
    }
    return (
      <button {...btnProps}>{btnContent}</button>
    )
  }

  render() {
    const { isMobileNavShown } = this.state;
    const { isLoggedIn, onLogout } = this.props;
    const headerClassNames = this.getHeaderClassNames(); 

    return (
      <header className={headerClassNames} onClick={this.handleCollapseNav} ref={this.headerRef}>
        <div className="header__content-wrap">
          <div className="header__primary-wrap">
            <Link to="/" className="header__app-name">NewsExplorer</Link>
            {this.getMenuButton()}
          </div>
          <Navigation 
            additionalCssClassNamesStr={`header__navigation ${isMobileNavShown ? 'header__navigation_shown' : ''}`} 
            onLogout={onLogout}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </header>
    );
  }

  getHeaderClassNames() {
    const { isMobileNavShown } = this.state;
    const { isSavedNewsHeader } = this.props;

    let headerClassNames = 'header';

    if (isMobileNavShown) {
      headerClassNames += ' header_expanded';

      if (isSavedNewsHeader) headerClassNames += ' header_saved-news header_state_expanded-saved-news';
      else headerClassNames += ' header_state_expanded-main';

    } else if (isSavedNewsHeader) headerClassNames += ' header_saved-news';
    
    return headerClassNames;
  }
}

export default Header;