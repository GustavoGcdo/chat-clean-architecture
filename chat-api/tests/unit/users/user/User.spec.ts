import User, { UserProps } from '../../../../src/core/users/domain/User';
import InvalidUserNameError from '../../../../src/core/users/errors/UserNameError';

describe('Dominio: User (usuário)', () => {
  it('Ao passar dados válidos deve retornar uma instancia de usuario', () => {
    const userProps: UserProps = {
      username: 'username',
      password: 'password',
      isOnline: true
    };

    const userOrError = User.create(userProps);

    expect(userOrError.isRight()).toBeTruthy()
    expect(userOrError.value).toBeInstanceOf(User);
  });

  it('Deve retornar erro ao tentar criar um usuario sem username', () => {
    const userProps: UserProps = {
      username: '',
      password: 'password',
      isOnline: true
    };

    const userOrError = User.create(userProps);

    expect(userOrError.isLeft()).toBeTruthy()
    expect(userOrError.value).toBeInstanceOf(InvalidUserNameError);
  });
});
