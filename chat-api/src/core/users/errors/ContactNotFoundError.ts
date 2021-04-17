export default class ContactNotFoundError extends Error {
  constructor() {
    super('user contact not found');
  }
}
