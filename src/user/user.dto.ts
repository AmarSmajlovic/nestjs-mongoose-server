import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  readonly first_name: string;
  readonly last_name: string;
  @IsNotEmpty()
  readonly username: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}

export class StoreUserDto {
  readonly first_name: string;
  readonly last_name: string;
  readonly picture: string;
  @IsNotEmpty()
  readonly username: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
