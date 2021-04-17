import { mock } from 'jest-mock-extended';
import User from '../../../../src/core/users/domain/User';
import UserAlreadyExistsError from '../../../../src/core/users/errors/UserAlreadyExitsError';
import IUserRepository from '../../../../src/core/users/repository/UserRepository';
import { CreateUserDto } from '../../../../src/core/users/useCases/createUser/CreateUserDto';
import CreateUserUseCase from '../../../../src/core/users/useCases/CreateUser/CreateUserUseCase';

describe('Caso de uso: CreateUser', () => {
  it('Deve obter sucesso ao criar um usuário valido', async () => {
    const mockUserRepo = mock<IUserRepository>();
    const createUser = new CreateUserUseCase(mockUserRepo);

    const validUser: CreateUserDto = {
      username: 'gustavogcdo',
      password: 'senha123'
    };

    mockUserRepo.findByUsername.mockResolvedValue(null);
    mockUserRepo.create.mockResolvedValue({ ...validUser, id: 'mockid' } as User);

    const userOrError = await createUser.execute(validUser);

    expect(userOrError.isRight()).toBeTruthy();
    expect(userOrError.value).toHaveProperty('id');
  });

  it('Deve retornar erro ao tentar cadastrar um usuario com *username* já existente', async () => {
    const mockUserRepo = mock<IUserRepository>();
    const createUser = new CreateUserUseCase(mockUserRepo);

    const validUser: CreateUserDto = {
      username: 'gustavogcdo',
      password: 'senha123'
    };

    mockUserRepo.findByUsername.mockResolvedValue({ ...validUser, id: 'mockid' } as User);

    const userOrError = await createUser.execute(validUser);

    expect(userOrError.isLeft()).toBeTruthy();
    expect(userOrError.value).toBeInstanceOf(UserAlreadyExistsError);
  });
});
