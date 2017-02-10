import ExtendableError from 'extendable-error';

export default class ApiError extends ExtendableError {
  constructor(message, statusCode, response) {
    super(message);
    this.statusCode = statusCode;
    this.response = response;
  }
}
