import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VerificationService {
  constructor(private readonly jwtService: JwtService) {}

  async decodeToken(token: string): Promise<any> {
    try {
      return this.jwtService.decode(token);
    } catch (err) {
      throw new BadRequestException(' error decoder ');
    }
  }
}
