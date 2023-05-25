import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './restaurant.schema';
import { CreateRestaurantDto } from './restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.find().exec();
  }

  async searchByName(name: string): Promise<Restaurant[]> {
    const regex = new RegExp(name, 'i'); // Create a case-insensitive regex pattern for searching
    return this.restaurantModel.find({ name: regex }).exec();
  }

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const createRestaurant = await this.restaurantModel.create(
      createRestaurantDto,
    );
    return createRestaurant;
  }
}
