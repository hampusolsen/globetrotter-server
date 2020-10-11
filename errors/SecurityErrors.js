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

class EncryptionError extends BaseError {
  constructor(message = 'Unable to encrypt value.', code = 500) {
    super(message, code);
    this.name = this.constructor.name;
  }
}

class InvalidProviderError extends BaseError {
  constructor(message, code = 422) {
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
  EncryptionError(message) {
    return new EncryptionError(message);
  },
  InvalidProviderError(provider) {
    const message = provider
      ? `'${provider}' is not an allowed authentication provider.`
      : 'Authentication provider not allowed.';

    return new InvalidProviderError(message);
  },
};
