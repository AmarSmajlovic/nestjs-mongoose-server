import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(userId: any): string {
    return this.jwtService.sign({ sub: userId });
  }

  generateRefreshToken(userId: any): string {
    return this.jwtService.sign({ sub: userId }, { expiresIn: '7d' }); // Set a longer expiration time for the refresh token
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      return null;
    }
  }
}
