import { Optional } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  @Optional()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
