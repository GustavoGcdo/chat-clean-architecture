import { mock } from 'jest-mock-extended';
import User from '../../../../src/core/users/domain/User';
import IUserRepository from '../../../../src/core/users/repository/UserRepository';
import { ListContactsDto } from '../../../../src/core/users/useCases/listContacts/ListContactsDto';
import ListContactsUseCase from '../../../../src/core/users/useCases/listContacts/ListContactsUseCase';
import UserNotFoundError from '../../../../src/core/users/errors/UserNotFoundError';

describe('Caso de uso: ListContacts', () => {
  it('Deve obter sucesso ao tentar obter listar contatos de um usuario', async () => {
    const mockUserRepo = mock<IUserRepository>();

    const listContacts = new ListContactsUseCase(mockUserRepo);

    const user = User.create({
      username: 'gustavo',
      password: 'senha',
      isOnline: false
    }).value as User;

    user.addContact(user);

    const listContactDto: ListContactsDto = {
      userid: 'mockuserid'
    };

    mockUserRepo.findById.mockResolvedValue(user);

    const contactsOrError = await listContacts.execute(listContactDto);

    expect(contactsOrError.isRight()).toBeTruthy();
    expect(Array.isArray(contactsOrError.value)).toBeTruthy();
    expect((contactsOrError.value as User[]).length).toBe(1);
  });

  it('Deve falhar ao tentar obter listar contatos de um usuario inexistente', async () => {
    const mockUserRepo = mock<IUserRepository>();

    const listContacts = new ListContactsUseCase(mockUserRepo);

    const listContactDto: ListContactsDto = {
      userid: 'non-existing-user'
    };

    mockUserRepo.findById.mockResolvedValue(null);

    const contactsOrError = await listContacts.execute(listContactDto);

    expect(contactsOrError.isLeft()).toBeTruthy();
    expect(contactsOrError.value).toBeInstanceOf(UserNotFoundError);
  });
});
