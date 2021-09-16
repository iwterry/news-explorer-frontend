import './NotFound.css';

function NotFound({ additionalCssClassNamesStr='' }) {
  return (
    <div className={`${additionalCssClassNamesStr} not-found`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="none" className="not-found__icon">
      <g stroke="#d1d2d6">
        <circle cx="43" cy="43" r="36.5"/>
        <path d="M69 69l19.5 19.5M58.328 55.959C54.661 51.698 49.228 49 43.164 49S31.668 51.698 28 55.959"/>
      </g>
      <g fill="#d1d2d6">
        <circle cx="55.5" cy="33.5" r="1.5"/>
        <circle cx="30.5" cy="33.5" r="1.5"/>
      </g>
    </svg>
      <h2 className="not-found__heading">Nothing found</h2>
      <p className="not-found__description">Sorry, but nothing matched your search terms.</p>
    </div>
  )
}

export default NotFound;