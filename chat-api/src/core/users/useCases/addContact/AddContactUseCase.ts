import { Either, right, left } from '../../../../shared/Either';
import User from '../../domain/User';
import IUserRepository from '../../repository/UserRepository';
import { AddContactDto } from './AddContactDto';
import UserNotFoundError from '../../errors/UserNotFoundError';
import ContactNotFoundError from '../../errors/ContactNotFoundError';
import { AppError } from '../../../../shared/AppError';

export class AddContactUseCase {
  private readonly useRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.useRepository = userRepository;
  }

  async execute(dto: AddContactDto): Promise<Either<UserNotFoundError, User>> {
    try {
      const user = await this.useRepository.findById(dto.userid);

      if (!user) {
        return left(new UserNotFoundError());
      }

      const contactToAdd = await this.useRepository.findByUsername(dto.usernameToAdd);

      if (!contactToAdd) {
        return left(new ContactNotFoundError());
      }

      user.addContact(contactToAdd);

      const userUpdated = await this.useRepository.save(user);

      return right(userUpdated);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
