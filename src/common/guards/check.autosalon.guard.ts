import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { AutoSalonRepository } from '../../modules/autosalon/autosalon.repository';
import { VerificationService } from '../../modules/verification/verification.service';

@Injectable()
export class CheckAutoSalonGuard implements CanActivate {
  constructor(
    @InjectRedisClient() private redisClient: RedisClient,
    private readonly verificationService: VerificationService,
    private readonly autoSalonRepository: AutoSalonRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.headers?.authorization) {
      const token = request.headers.authorization.split(' ');
      if (token[0] == 'Bearer' && token[1] != '') {
        const jwtToken = token[1];
        const extractData =
          await this.verificationService.decodeToken(jwtToken);
        const idSalon = extractData.id;
        if (
          this.autoSalonRepository.findOne({
            where: {
              id: idSalon,
            },
          })
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
