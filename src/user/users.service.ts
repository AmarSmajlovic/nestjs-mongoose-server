import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './user.dto';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const modifiedDto = { ...createUserDto }; // Create a shallow copy of the object
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    modifiedDto.password = hashedPassword;

    const createdUser = await this.userModel.create(modifiedDto);
    return createdUser;
  }
}
