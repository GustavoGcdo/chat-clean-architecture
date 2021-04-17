import { Either, left, right } from '../../../shared/Either';
import InvalidUserNameError from '../errors/UserNameError';

export type UserProps = {
  username: string;
  password: string;
  isOnline: boolean;
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

    return right(new User(props, id));
  }

  public get id() : string {
    return this._id;
  }

  public get username() : string {
    return this.props.username;
  }

  public get password() : string {
    return this.props.password;
  }

  public get isOnline() : boolean {
    return this.props.isOnline;
  }
}
