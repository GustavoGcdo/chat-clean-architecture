import InvalidUserNameError from '../../errors/UserNameError';
import User from '../../domain/User';
import { Either, right, left } from '../../../../shared/Either';
import IUserRepository from '../../repository/UserRepository';
import { CreateUserDto } from './CreateUserDto';
import UserAlreadyExistsError from '../../errors/UserAlreadyExitsError';
import { AppError } from '../../../../shared/AppError';

type CreateUserResponse = Either<
  InvalidUserNameError | UserAlreadyExistsError | AppError.UnexpectedError,
  User
>;

export default class CreateUserUseCase {
  private readonly useRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.useRepository = userRepository;
  }

  async execute(dto: CreateUserDto): Promise<CreateUserResponse> {
    try {
      const userOrError = User.create({ ...dto, isOnline: false });

      if (userOrError.isLeft()) {
        return userOrError;
      }

      const userToCreate: User = userOrError.value;

      const userFound = await this.useRepository.findByUsername(userToCreate.username);

      if (userFound) {
        return left(new UserAlreadyExistsError());
      }

      const userCreated = await this.useRepository.create(userToCreate);

      return right(userCreated);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
