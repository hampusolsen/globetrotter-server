class BaseError extends Error {
  constructor(message = 'Internal Server Error', code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.status = code < 300 ? 'success' : 'failure';
  }
}

module.exports = BaseError;
