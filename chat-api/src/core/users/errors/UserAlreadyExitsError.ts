export default class UserAlreadyExistsError extends Error {
  constructor() {
    super('username already exists');
  }
}
