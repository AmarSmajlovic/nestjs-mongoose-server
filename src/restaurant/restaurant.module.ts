import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './restaurant.controller';
import { RestaurantsService } from './restaurants.service';
import { Restaurant, RestaurantSchema } from './restaurant.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Cluster08084:QxlQPbgHAzo0a2tG@cluster0.ze49hhq.mongodb.net/',
      { dbName: 'sample_restaurants' },
    ),
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
