import { Component } from "react";
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);

    const partsOfState = this.getResettedState();

    this.state = {
      ...partsOfState,
      hasComponentMounted: false,
      isSubmitting: false,
    };
  }

  componentDidMount() {
    this.setState({ hasComponentMounted: true });
  }

  componentDidUpdate(prevProps) {
    if(
      prevProps.shouldReset
      || !this.props.shouldReset
      || this.state.isSubmitting
    ) return;

    this.setState(this.getResettedState());
    
  }

  handleInputChange = ({ target }) => {
    const fieldName = target.name
    this.setState({
      fields: {
        ...this.state.fields,
        [fieldName]: target.value,
      },
      errors: {
        fields: {
          ...this.state.errors.fields,
          [fieldName]: this.getInputFieldError(fieldName).message, 
        },
        form: this.state.errors.form,
      },
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();

    const errors = { ...this.state.errors };

    this.setState({ isSubmitting: true });
    try {
      await this.props.onSubmit(this.state.fields)
      this.setState({ ...this.getResettedState() });
    } catch(err) {
      errors.form = err.message;
    }
    
    this.setState({ errors, isSubmitting: false });
  };

  getResettedState() {
    const state = {
      fields: {},
      errors: {
        fields: {},
        form: '',
      },
    };

    this.props.formInfo.fields.forEach(({ name, initialValue }) => {
      state.fields[name] = initialValue;
      state.errors.fields[name] = '';
    });

    return state;
  }

  checkIfAnyInvalidInputField() {
    const { fields } = this.state;
    return Object.keys(fields).some((fieldName) => this.getInputFieldError(fieldName).hasError);
  }

  getInputFieldError(fieldName) {
    const { formName } = this.props.formInfo;
    const fieldDomElement = document.forms[formName].elements[fieldName];

    return {
      hasError: !fieldDomElement.validity.valid,
      message: fieldDomElement.validationMessage
    };
  }

  renderInputElementGroup(fieldData) {
    const { fields, errors } = this.state;
    const { fields: fieldErrors } = errors;
    const { 
      name: fieldName,
      label: fieldLabel,
      placeholder: fieldPlaceholder,
      validation,
    } = fieldData;

    const {
      type: inputElementType = 'text',
      required: isFieldRequired, 
      ...otherValidationProperties /* to support other properties that validate data on the <input> element */
    } = validation;

    let fieldErrorClassNames = 'form__error-msg form__error-msg_name_email-field-error';

    if(fieldErrors.hasOwnProperty(fieldName) && fieldErrors[fieldName]) {
      fieldErrorClassNames += ' form__error-msg_visible';
    }

    const { formName }= this.props.formInfo;
    const id = `${formName}_${fieldName}`;
    return (
      <div className="form__input-field-group-wrap" key={fieldName}>
        <label htmlFor={id} className="form__input-field-label">{fieldLabel}</label>
        <input
          type={inputElementType}
          id={id}
          className="form__input-field"
          name={fieldName}
          placeholder={fieldPlaceholder}
          value={fields[fieldName]}
          required={isFieldRequired}
          {...otherValidationProperties}
          onChange={this.handleInputChange} 
        />
        <span className={fieldErrorClassNames}>{fieldErrors[fieldName]}</span>
      </div>
    );
  }

  render() {
    const { hasComponentMounted, isSubmitting } = this.state;
    const { form: formSubmissionError } = this.state.errors;
    const { formInfo } = this.props;
    const { 
      heading: formHeading,
      submitBtnLabel='Submit',
      submitBtnLabelWhenSubmitting='Submitting',
      formName,
      fields: fieldsData,
    } = formInfo;

    return (
      <form name={formName} className="form" noValidate={true} onSubmit={this.handleSubmit}>
        <h3 className="form__heading">{formHeading}</h3>
        {fieldsData.map((fieldData) => this.renderInputFieldGroup(fieldData))}
        <span className={
          `form__error-msg form__error-msg_name_form-submission-error ${formSubmissionError ? 'form__error-msg_visible' : '' }`
        }>
          {formSubmissionError}
        </span>
        <button 
          type="submit" 
          className="form__submit-btn" 
          disabled={(hasComponentMounted && this.checkIfAnyInvalidInputField()) || isSubmitting}
        >
          { isSubmitting ? submitBtnLabelWhenSubmitting : submitBtnLabel }
        </button>
      </form>
    );
  }

  renderInputFieldGroup(fieldData) {
    if(!fieldData.htmlElementType || fieldData.htmlElementType.toLowerCase() === 'input') {
      return this.renderInputElementGroup(fieldData);
    }

    throw new Error('Only the <input> element is currently supported');
  }
}

export default Form;