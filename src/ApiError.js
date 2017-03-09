import ExtendableError from 'extendable-error';

export default class ApiError extends ExtendableError {
  constructor(message, statusCode, response, additionalData) {
    super(message);
    this.statusCode = statusCode;
    this.response = response;
    this.data = additionalData;
  }
}
