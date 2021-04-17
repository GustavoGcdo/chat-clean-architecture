import User from '../domain/User';

export default interface IUserRepository {
  save(user: User): Promise<User>;
  findById(userid: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  create(user: User): Promise<User>;
}
