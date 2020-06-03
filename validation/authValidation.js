const rules = {
  email: 'required|email',
  firstName: 'required|alpha',
  lastName: 'required|alpha',
  phoneNumber: 'required|min:8|max:8',
  password: 'required|min:8|max:40',
  passwordConfirmation: 'required'
};

const messages = {
  'email.email': 'Please enter a valid email.',
  'email.required': 'Email is required.',
  'firstName.alpha': 'First name contains unallowed characters.',
  'firstName.required': 'First name is required.',
  'lastName.alpha': 'Last name contains unallowed characters.',
  'lastName.required': 'Last name is required.',
  'phoneNumber.min': 'Phone number length should be 8 digits.',
  'phoneNumber.max': 'Phone number length should be 8 digits.',
  'phoneNumber.required': 'Phone number is required.',
  'password.min': 'Password is too short. Minimum length is 8 characters.',
  'password.max': 'Password is too long. Maximum length is 40 characters.',
  'password.required': 'Password is required.',
  'passwordConfirmation.required': 'Password confirmation is required.'
};

module.exports = { rules, messages };
