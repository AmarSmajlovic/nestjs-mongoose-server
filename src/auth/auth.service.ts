import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/users.service';
import { isPasswordMatch } from 'src/utils';
import { JwtAuthService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtAuthService,
  ) {}

  async validateUser(username: string, password: string): Promise<any | null> {
    const user = await this.usersService.findUserByUsername(username);

    if (user && (await isPasswordMatch(password, user.password))) {
      const { password: _, ...result } = user; // Exclude the password from the returned result
      return result;
    }

    return null;
  }

  async login(@Req() req): Promise<any> {
    const user = req.user._doc;
    const access_token = this.jwtService.generateAccessToken(user._id);
    const refresh_token = this.jwtService.generateRefreshToken(user._id);
    return {
      meessage: 'User Info from Database',
      user: { ...req.user._doc, access_token, refresh_token },
    };
  }

  refreshToken(refreshToken: string): { accessToken: string } {
    const payload = this.jwtService.verifyToken(refreshToken);
    if (!payload) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const accessToken = this.jwtService.generateAccessToken(payload.sub);
    return { accessToken };
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    } else {
      const user = await this.usersService.findUserByEmail(req.user.email);
      if (user) {
        const access_token = this.jwtService.generateAccessToken(user._id);
        const refresh_token = this.jwtService.generateRefreshToken(user._id);
        return {
          message: 'User Info from Google',
          user: req.user,
          access_token,
          refresh_token,
        };
      }
      const storedUser = await this.usersService.store(req.user);
      const access_token = this.jwtService.generateAccessToken(storedUser._id);
      const refresh_token = this.jwtService.generateRefreshToken(
        storedUser._id,
      );
      return {
        message: 'Stored user',
        user: req.user,
        access_token,
        refresh_token,
      };
    }
  }

  async facebookLogin(req) {
    if (!req.user) {
      return 'No user from facebook';
    } else {
      const user = await this.usersService.findUserByEmail(req.user.email);
      if (user) {
        const access_token = this.jwtService.generateAccessToken(user._id);
        const refresh_token = this.jwtService.generateRefreshToken(user._id);
        return {
          message: 'User Info from Facebook',
          user: req.user,
          access_token,
          refresh_token,
        };
      }
      const storedUser = await this.usersService.store(req.user);
      const access_token = this.jwtService.generateAccessToken(storedUser._id);
      const refresh_token = this.jwtService.generateRefreshToken(
        storedUser._id,
      );
      return {
        message: 'Stored user',
        user: req.user,
        access_token,
        refresh_token,
      };
    }
  }
}
