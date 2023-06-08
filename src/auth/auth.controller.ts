import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/users.service';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() loginUserDto: any) {
    try {
      return this.authService.login(
        loginUserDto.username,
        loginUserDto.password,
      );
    } catch (error) {
      return error;
    }
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: `${createUserDto.username} created successfully`,
      };
    } catch (error) {
      return error;
    }
  }
}
