const BaseError = require('./BaseError');

class CachingError extends BaseError {
  constructor(message = 'Error caching data.', code = 500) {
    super(message, code);
    this.name = this.constructor.name;
  }
}

class ConnectionError extends BaseError {
  constructor(message = 'Unable to connect with the database.', code = 503) {
    super(message, code);
    this.name = this.constructor.name;
  }
}

class EntityNotFoundError extends BaseError {
  constructor(message = 'Entity not found in database.', code = 422) {
    super(message, code);
    this.name = this.constructor.name;
  }
}

class EntityValidationError extends BaseError {
  constructor(message = 'Entity failed validation.', code = 422) {
    super(message, code);
    this.name = this.constructor.name;
  }
}

class UniqueFlagViolationError extends BaseError {
  constructor(message = 'Entity property violates unique flag.', code = 409) {
    super(message, code);
    this.name = this.constructor.name;
  }
}

module.exports = {
  CachingError(message) {
    return new CachingError(message);
  },
  ConnectionError() {
    return new ConnectionError();
  },
  EntityNotFoundError() {
    return new EntityNotFoundError();
  },
  EntityValidationError() {
    return new EntityValidationError();
  },
  UniqueFlagViolationError(property) {
    return new UniqueFlagViolationError(
      property && `Property "${property}" violates unique flag.`
    );
  },
};
