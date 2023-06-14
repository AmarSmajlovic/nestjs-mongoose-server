import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto, StoreUserDto } from './user.dto';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUserByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ username }).exec();
      return user;
    } catch (error) {
      throw new Error('User cannot be found');
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      return user;
    } catch (error) {
      throw new Error('User cannot be found');
    }
  }

  async findUserById(
    id: mongoose.Types.ObjectId | string,
  ): Promise<User | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      return user;
    } catch (error) {
      throw new Error('User cannot be found');
    }
  }

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

  async store(storeUserDto: StoreUserDto): Promise<User> {
    const storedUser = await this.userModel.create(storeUserDto);
    return storedUser;
  }
}
