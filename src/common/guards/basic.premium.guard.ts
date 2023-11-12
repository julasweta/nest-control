import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from '../../modules/users/user.repository';

@Injectable()
export class BasicPremiumGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userRepository: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.id;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user.accountType === 'Premium') {
      return true;
    }
    if (user.accountType === 'Basic') {
      throw new HttpException(
        'у вас немає доступу, оновіть аккаунт до Premium',
        HttpStatus.FORBIDDEN,
      );
    }
    if (!user) {
      throw new HttpException('Access denied.', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
