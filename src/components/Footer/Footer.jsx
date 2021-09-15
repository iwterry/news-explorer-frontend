import { Link } from 'react-router-dom';

import './Footer.css';

// I am using <a> element for external links and <Link> for internal links 
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content-wrap">
        <span className="footer__copyright-info">&copy; 2021 Supersite, Powered by News API</span>
        <ul className="footer__regular-list">
          <li className="footer__regular-list-item">
            <Link to="/" className="footer__regular-list-link">Home</Link>
          </li>
          <li className="footer__regular-list-item">
            <a href="https://practicum.yandex.com" target="_blank" className="footer__regular-list-link" rel="noreferrer">
              Practicum by Yandex
            </a>
          </li>
        </ul>
        <ul className="footer__social-list">
          <li className="footer__social-list-item">
            <a href="https://github.com/iwterry/" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" fill="none" aria-hidden={true}>
              <path fillRule="evenodd" d="M11 .895A10.11 10.11 0 0 0 .895 11c0 4.466 2.897 8.25 6.911 9.59.502.093.689-.217.689-.49l-.012-1.718c-2.81.608-3.406-1.352-3.406-1.352-.459-1.166-1.123-1.476-1.123-1.476-.918-.627.068-.614.068-.614 1.011.075 1.551 1.042 1.551 1.042.899 1.545 2.363 1.098 2.94.838.093-.651.354-1.098.639-1.352-2.246-.254-4.603-1.123-4.603-4.994 0-1.104.391-2.004 1.042-2.711-.105-.254-.453-1.284.099-2.674 0 0 .85-.273 2.779 1.036.806-.223 1.669-.335 2.531-.341.856.006 1.724.118 2.531.341 1.929-1.309 2.779-1.036 2.779-1.036.552 1.39.205 2.419.099 2.674.645.707 1.036 1.607 1.036 2.711 0 3.883-2.363 4.733-4.615 4.988.36.31.689.93.689 1.873l-.012 2.773c0 .273.18.583.695.484 4.014-1.34 6.904-5.124 6.904-9.584A10.11 10.11 0 0 0 11 .895z" fill="#191717"/>
            </svg>
            </a>
          </li> 
          <li className="footer__social-list-item">
            <a href="https://www.facebook.com/YPracticum/" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" aria-hidden={true}>
              <path d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.793C0 19.506.494 20 1.104 20h9.579v-7.745H8.077V9.237h2.607V7.011c0-2.583 1.578-3.99 3.883-3.99a21.38 21.38 0 0 1 2.329.119v2.7l-1.598.001c-1.253 0-1.496.596-1.496 1.469v1.928h2.989l-.389 3.018h-2.6V20h5.097c.608 0 1.102-.494 1.102-1.104V1.104C20 .494 19.506 0 18.896 0h0z" fill="#000"/>
            </svg>
            </a>
          </li> 
        </ul>
      </div>
    </footer>
  );
}

export default Footer;