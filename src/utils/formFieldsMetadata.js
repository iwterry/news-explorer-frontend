const fields = {
  email: {
    name: 'email',
    htmlElementType: 'input',
    label: 'Email',
    initialValue: '',
    placeholder: 'Enter email',
    validation: {
      type: 'email',
      required: true,
    },
  },
  password: {
    name: 'password',
    htmlElementType: 'input',
    label: 'Password',
    initialValue: '',
    placeholder: 'Enter password',
    validation: {
      type: 'password',
      required: true,
    },
  },
  username: {
    name: 'username',
    htmlElementType: 'input',
    label: 'Username',
    initialValue: '',
    placeholder: 'Enter username',
    validation: {
      type: 'text',
      required: true,
      minLength: 2,
      maxLength: 30,
    },
  },
};

export default fields;

