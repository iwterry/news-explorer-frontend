import { Link } from 'react-router-dom';
import './RegistrationSuccess.css';

function RegistrationSuccess({ loginPath }) {
  return (
    <div className="registration-success">
      <span className="registration-success__message">Registration successfully completed!</span>
      <Link to={loginPath} className="registration-success__link">Sign in</Link>
    </div>
  )
}

export default RegistrationSuccess;