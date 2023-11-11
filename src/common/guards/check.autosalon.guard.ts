import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { AuthService } from '../../modules/auth/auth.service';
import { AutoSalonRepository } from '../../modules/autosalon/autosalon.repository';

@Injectable()
export class CheckAutoSalonGuard implements CanActivate {
  constructor(
    @InjectRedisClient() private redisClient: RedisClient,
    private readonly authService: AuthService,
    private readonly autoSalonRepository: AutoSalonRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.headers?.authorization) {
      const token = request.headers.authorization.split(' ');
      if (token[0] == 'Bearer' && token[1] != '') {
        const jwtToken = token[1];
        const extractData = await this.authService.decodeToken(jwtToken);
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
