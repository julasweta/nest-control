import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from '../../modules/users/user.repository';
import { VerificationService } from '../../modules/verification/verification.service';
import { extractTokenFromHeader } from '../utils/token-utils';

@Injectable()
export class BasicPremiumGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private verificationService: VerificationService,
    private readonly userRepository: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request.headers.authorization);
    const decodeToken = await this.verificationService.decodeToken(token);
    const user = await this.userRepository.findOneBy({ id: decodeToken.id });
    console.log('user', user);
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
