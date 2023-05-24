import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurant/restaurant.module';

@Module({
  imports: [RestaurantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
