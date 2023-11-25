import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../../common/interfaces/token.interface';

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

  async signToken(payload: TokenPayload): Promise<any> {
    try {
      return this.jwtService.sign(payload);
    } catch (err) {
      throw new BadRequestException(' error decoder ');
    }
  }

  async verifyToken(refreshToken: string): Promise<TokenPayload> {
    try {
      return await this.jwtService.verify(refreshToken);
    } catch (err) {
      throw new BadRequestException(' error decoder ');
    }
  }
}
