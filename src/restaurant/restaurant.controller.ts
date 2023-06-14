import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './restaurant.schema';
import { CreateRestaurantDto } from './restaurant.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query('name') name?: string): Promise<Restaurant[]> {
    if (name) {
      return this.restaurantService.searchByName(name);
    }
    return this.restaurantService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    await this.restaurantService.create(createRestaurantDto);
  }
}
