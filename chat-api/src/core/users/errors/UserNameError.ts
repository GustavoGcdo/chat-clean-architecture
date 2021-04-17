export default class InvalidUserNameError extends Error {
  constructor() {
    super('username invalid');
  }
}
