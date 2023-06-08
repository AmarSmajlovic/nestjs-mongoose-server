import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/users.service';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

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
