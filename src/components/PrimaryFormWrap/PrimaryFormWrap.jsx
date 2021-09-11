import Form from '../Form/Form';
import './PrimaryFormWrap.css';

function PrimaryFormWrap(props) {
  const { formInfo, link, onSubmit, shouldReset } = props;


  return (
    <div className="primary-form-wrap">
      <Form formInfo={formInfo} shouldReset={shouldReset} onSubmit={onSubmit} />
      <span className="primary-form-wrap__link-wrap">
        or <a href={link.path} className="primary-form-wrap__link">{link.text}</a>
      </span>
    </div>
  );
}

export default PrimaryFormWrap;