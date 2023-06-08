import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './restaurant.controller';
import { RestaurantsService } from './restaurants.service';
import { Restaurant, RestaurantSchema } from './restaurant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
