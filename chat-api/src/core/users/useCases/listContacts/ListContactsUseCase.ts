import { AppError } from '../../../../shared/AppError';
import { Either, left, right } from '../../../../shared/Either';
import User from '../../domain/User';
import UserAlreadyExistsError from '../../errors/UserAlreadyExitsError';
import UserNotFoundError from '../../errors/UserNotFoundError';
import IUserRepository from '../../repository/UserRepository';
import { ListContactsDto } from './ListContactsDto';

type ListContactsResponse = Either<UserNotFoundError | AppError.UnexpectedError, User[]>;

export default class ListContactsUseCase {
  private readonly useRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.useRepository = userRepository;
  }

  async execute(dto: ListContactsDto): Promise<ListContactsResponse> {
    try {
      const user = await this.useRepository.findById(dto.userid);

      if (!user) {
        return left(new UserNotFoundError());
      }

      return right(user.contacts);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
