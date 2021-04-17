import User from '../domain/User';

export default interface IUserRepository {
  findByUsername(username: string): Promise<User | null>;
  create(user: User): Promise<User>;
}
