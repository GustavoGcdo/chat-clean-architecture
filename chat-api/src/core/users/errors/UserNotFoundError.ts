export default class UserNotFoundError extends Error {
  constructor() {
    super('username not found');
  }
}
