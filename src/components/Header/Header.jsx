import { Component } from 'react';
import Nav from '../Nav/Nav';

import './Header.css'

class Header extends Component {
  state = {
    isMobileNavShown: false,
  }

  handleMobileNavBarToggle = () => {
    this.setState({ isMobileNavShown: !this.state.isMobileNavShown });
  };

  render() {
    const { isMobileNavShown } = this.state;
    const { isSavedNewsHeader } = this.props;

    const btnShownClassName = 'header__menu-btn_shown';
    const headerClassNames = this.getHeaderClassNames(); 

    return (
      <header className={headerClassNames}>
        <div className="header__primary-wrap">
          <a href="/" className="header__app-name">NewsExplorer</a>
          <button 
            className={`header__menu-btn ${isMobileNavShown ?  btnShownClassName : ''}`} 
            aria-label="Collapse"
            onClick={this.handleMobileNavBarToggle}
          >
            <svg className="header__collapse-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true">
              <path d="M13.414 12l5.293 5.293-1.414 1.414-6-6a1 1 0 0 1 0-1.414l6-6 1.414 1.414L13.414 12z"/>
              <path d="M10.879 12l-5.293 5.293L7 18.707l6-6a1 1 0 0 0 0-1.414l-6-6-1.414 1.414L10.879 12z"/>
            </svg>
          </button>
          <button
            className={`header__menu-btn header__menu-btn_expand-btn ${!isMobileNavShown ? btnShownClassName : ''}`} 
            aria-label="Expand"
            onClick={this.handleMobileNavBarToggle}
          >
            <span className="header__hamburger-line"></span>
            <span className="header__hamburger-line"></span>
          </button>
        </div>
        <Nav 
          isSavedNewsHeader={isSavedNewsHeader} 
          additionalCssClassNamesStr={`header__nav ${isMobileNavShown ? 'header__nav_shown' : ''}`}    
        />
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