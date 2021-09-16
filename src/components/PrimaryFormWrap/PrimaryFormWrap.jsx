import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import './PrimaryFormWrap.css';

function PrimaryFormWrap(props) {
  const { formInfo, link, onSubmit, shouldReset } = props;


  return (
    <div className="primary-form-wrap">
      <Form formInfo={formInfo} shouldReset={shouldReset} onSubmit={onSubmit} />
      <span className="primary-form-wrap__link-wrap">
        or <Link to={link.path} className="primary-form-wrap__link">{link.text}</Link>
      </span>
    </div>
  );
}

export default PrimaryFormWrap;