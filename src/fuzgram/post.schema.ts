import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true })
  uid: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true, index: "text" })
  caption: string;

//   @Prop({
//     required: [true, 'Social Required'],
//     enum: {
//       values: ['instagram', 'twitter'],
//       message: '{VALUE} is not supported',
//     },
//   })
//   social: string;

  @Prop({ required: true })
  socialUsername: string;

  @Prop({ required: true })
  username: string;

  @Prop()
  media_type: string;

  @Prop()
  media_url: string;
}

const PostSchema = SchemaFactory.createForClass(Post);

export {PostSchema}