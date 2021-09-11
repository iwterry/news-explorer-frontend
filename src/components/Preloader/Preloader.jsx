import './Preloader.css';

function Preloader() {
  return (
    <div className="preloader">
      <span className="preloader__spinner"></span>
      <p className="preloader__description">Searching for news...</p>
    </div>
  );
}

export default Preloader;