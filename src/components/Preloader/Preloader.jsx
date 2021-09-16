import './Preloader.css';

function Preloader({ description='Loading...', additionalCssClassNamesStr='' }) {
  return (
    <div className={`${additionalCssClassNamesStr} preloader`}>
      <span className="preloader__spinner"></span>
      <p className="preloader__description">{description}</p>
    </div>
  );
}

export default Preloader;