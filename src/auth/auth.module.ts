import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/users.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Cluster08084:QxlQPbgHAzo0a2tG@cluster0.ze49hhq.mongodb.net/',
      { dbName: 'sample_restaurants' },
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [UserService],
})
export class AuthModule {}
