import './Nav.css';

function Nav(props) {
  const { isLoggedIn, additionalCssClassNamesStr='' } = props;

  return (
    <nav className={`nav ${additionalCssClassNamesStr}`}>
    <ul className="nav__list">
      <li className="nav__list-item">
        <a href="/" className="nav__list-link nav__list-link_type_home" onClick={(e) => e.preventDefault()}>
          Home
        </a>
      </li>
      { !isLoggedIn && (
        <li className="nav__list-item nav__list-item_type_sign-in">
          <a href="/" className="nav__list-link nav__list-link_button nav__list-link_type_sign-in">
            Sign in
          </a>
        </li>
      )}
      { isLoggedIn && (
        <>
          <li className="nav__list-item nav__list-item_type_saved-news">
            <a href="/" className="nav__list-link nav__list-link_type_saved-news">
              Saved articles
            </a>
          </li>
          <li className="nav__list-item">
            <a href="/" className="nav__list-link nav__list-link_button nav__list-link_type_logout">
              Elise
              <svg className="nav__logout-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" >
                <path fillRule="evenodd" d="M10 6H6v12h4v2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4v2zm7.586 7l-4.293 4.134 1.414 1.362 6.707-6.459-6.707-6.459-1.414 1.362 4.293 4.134H8V13h9.586z"/>
              </svg>
            </a>
          </li>
        </>
      )}
    </ul>
  </nav>
  );
}

export default Nav;

