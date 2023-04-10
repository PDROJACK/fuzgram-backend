import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

type Link = {
    website: string;
    url: string;
  };
  
type Integration = {
    social: string;
    username: string;
    token: string;
    status: boolean;
};

export interface User {
    uid: string;
    username: string;
    links: Link[];
    email: string;
    profile: string;
    userToken: string | null;
}

@Schema()
export class User {
  @Prop({required: true})
  uid: string

  @Prop({required: true})
  username: string

  @Prop({required: true})
  email: string

  @Prop()
  profile: string

  @Prop()
  links: Link[]
}

export const UserSchema = SchemaFactory.createForClass(User);