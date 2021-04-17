import { mock } from 'jest-mock-extended';
import IUserRepository from '../../../../src/core/users/repository/UserRepository';
import { AddContactDto } from '../../../../src/core/users/useCases/addContact/AddContactDto';
import { AddContactUseCase } from '../../../../src/core/users/useCases/addContact/AddContactUseCase';
import User from '../../../../src/core/users/domain/User';
import UserNotFoundError from '../../../../src/core/users/errors/UserNotFoundError';
import ContactNotFoundError from '../../../../src/core/users/errors/ContactNotFoundError';

describe('Caso de uso: AddContact', () => {
  it('Deve obter sucesso ao tentar adicionar um usuário a lista de contatos', async () => {
    const mockUserRepo = mock<IUserRepository>();

    const addContact = new AddContactUseCase(mockUserRepo);

    const user = User.create({
      username: 'gustavo',
      password: 'senha',
      isOnline: false
    });

    const addContactDto: AddContactDto = {
      userid: 'mockuserid',
      usernameToAdd: 'otheruser'
    };

    mockUserRepo.findById.mockResolvedValue(user.value as User);
    mockUserRepo.findByUsername.mockResolvedValue({
      ...user.value,
      username: addContactDto.usernameToAdd
    } as User);
    mockUserRepo.save.mockImplementation((user) => Promise.resolve(user));

    const userOrError = await addContact.execute(addContactDto);

    expect(userOrError.isRight()).toBeTruthy();
    expect(userOrError.value).toBeInstanceOf(User);
    expect((userOrError.value as User).contacts.length).toBe(1);
  });

  it('Deve retornar erro ao tentar adicionar um contato a um usuario inexistente', async () => {
    const mockUserRepo = mock<IUserRepository>();

    const addContact = new AddContactUseCase(mockUserRepo);

    const addContactDto: AddContactDto = {
      userid: 'non-existing-user',
      usernameToAdd: 'mockusername'
    };

    mockUserRepo.findById.mockResolvedValue(null);

    const userOrError = await addContact.execute(addContactDto);

    expect(userOrError.isLeft()).toBeTruthy();
    expect(userOrError.value).toBeInstanceOf(UserNotFoundError);
  });

  it('Deve retornar erro ao tentar adicionar um usuário inexistente a lista de contatos', async () => {
    const mockUserRepo = mock<IUserRepository>();

    const addContact = new AddContactUseCase(mockUserRepo);

    const user = User.create({
      username: 'gustavo',
      password: 'senha',
      isOnline: false
    });

    const addContactDto: AddContactDto = {
      userid: 'mockuserid',
      usernameToAdd: 'non-existing-user'
    };

    mockUserRepo.findById.mockResolvedValue(user.value as User);
    mockUserRepo.findByUsername.mockResolvedValue(null);

    const userOrError = await addContact.execute(addContactDto);

    expect(userOrError.isLeft()).toBeTruthy();
    expect(userOrError.value).toBeInstanceOf(ContactNotFoundError);
  });
});
