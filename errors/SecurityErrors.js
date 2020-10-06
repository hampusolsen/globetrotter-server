const BaseError = require('./BaseError');

class AuthenticationError extends BaseError {
  constructor(message = 'Invalid credentials.', code = 401) {
    super(message, code);
    this.name = this.constructor.name;
  }
}

class AuthorizationError extends BaseError {
  constructor(message = 'Unauthorized access.', code = 403) {
    super(message, code);
    this.name = this.constructor.name;
  }
}

module.exports = {
  AuthenticationError() {
    return new AuthenticationError();
  },
  AuthorizationError() {
    return new AuthorizationError();
  },
};
