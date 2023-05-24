import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './restaurant.schema';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Get()
  async findAll(@Query('name') name?: string): Promise<Restaurant[]> {
    if (name) {
        return this.restaurantService.searchByName(name);
      }
      return this.restaurantService.findAll();
    }
}