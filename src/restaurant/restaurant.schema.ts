import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema()
export class Address {
  @Prop({ type: String })
  building: string;

  @Prop({ type: [Number], index: '2dsphere' })
  coord: number[];

  @Prop({ type: String })
  street: string;

  @Prop({ type: String })
  zipcode: string;
}

@Schema()
export class Restaurant {
  @Prop({ type: Address })
  address: Address;

  @Prop()
  borough: string;

  @Prop()
  cuisine: string;

  @Prop()
  grades: {
    date: Date;
    grade: string;
    score: number;
  }[];

  @Prop()
  name: string;

  @Prop()
  restaurant_id: number;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
