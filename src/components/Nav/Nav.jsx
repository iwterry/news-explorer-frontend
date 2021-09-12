import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Nav.css';

function Nav(props) {
  const { additionalCssClassNamesStr='' } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const isLoggedIn = Boolean(currentUser.email);

  return (
    <nav className={`nav ${additionalCssClassNamesStr}`}>
    <ul className="nav__list">
      <li className="nav__list-item">
        <NavLink
          to="/"
          exact={true}
          className="nav__list-item-content nav__list-item-content_for_home"
          activeClassName="nav__list-item-content_active-link"
          data-can-hide-mobile-nav={true}
        >
          Home
        </NavLink>
      </li>
      { !isLoggedIn && (
        <li className="nav__list-item nav__list-item_type_sign-in">
          <Link
            to="/sign-in"
            className="nav__list-item-content nav__list-item-content_button nav__list-item-content_for_sign-in"
            data-can-hide-mobile-nav={true}
          >
            Sign in
          </Link>
        </li>
      )}
      { isLoggedIn && (
        <>
          <li className="nav__list-item nav__list-item_type_saved-news">
            <NavLink
              to="/saved-news"
              className="nav__list-item-content nav__list-item-content_for_saved-news"
              activeClassName="nav__list-item-content_active-link"
              data-can-hide-mobile-nav={true}
            >
              Saved articles
            </NavLink>
          </li>
          <li className="nav__list-item">
            <button 
              className="nav__list-item-content nav__list-item-content_button nav__list-item-content_for_logout" 
              aria-label="Sign out"
              title="Sign out"
              data-can-hide-mobile-nav={true}
            >
              <span className="nav__username">{currentUser.name}</span>
              <svg className="nav__logout-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" >
                <path fillRule="evenodd" d="M10 6H6v12h4v2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4v2zm7.586 7l-4.293 4.134 1.414 1.362 6.707-6.459-6.707-6.459-1.414 1.362 4.293 4.134H8V13h9.586z"/>
              </svg>
            </button>
          </li>
        </>
      )}
    </ul>
  </nav>
  );
}

export default Nav;

