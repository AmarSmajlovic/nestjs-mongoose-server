import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './users.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Cluster08084:QxlQPbgHAzo0a2tG@cluster0.ze49hhq.mongodb.net/',
      { dbName: 'sample_restaurants' },
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
