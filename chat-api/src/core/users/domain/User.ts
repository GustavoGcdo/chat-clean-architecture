/* eslint-disable no-use-before-define */
import { Either, left, right } from '../../../shared/Either';
import InvalidUserNameError from '../errors/UserNameError';

export type UserProps = {
  username: string;
  password: string;
  isOnline: boolean;
  contacts?: User[];
};

export default class User {
  private _id: string;
  private props: UserProps;

  private constructor(props: UserProps, id?: string) {
    this.props = props;
    if (id) this._id = id;
  }

  public static create(props: UserProps, id?: string): Either<InvalidUserNameError, User> {
    if (!props.username && props.username.trim().length === 0) {
      return left(new InvalidUserNameError());
    }

    if (!props.contacts) {
      props.contacts = [];
    }

    return right(new User(props, id));
  }

  public get id(): string {
    return this._id;
  }

  public get username(): string {
    return this.props.username;
  }

  public get password(): string {
    return this.props.password;
  }

  public get isOnline(): boolean {
    return this.props.isOnline;
  }

  public addContact(user: User): void {
    const foundUser = this.props.contacts.find((u) => u.id === user.id);
    if (!foundUser) {
      this.props.contacts.push(user);
    }
  }

  public get contacts(): User[] {
    return this.props.contacts;
  }
}
