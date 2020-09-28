const BaseError = require('./BaseError');

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
