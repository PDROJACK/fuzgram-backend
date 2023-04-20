import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TrackerDocument = HydratedDocument<Tracker>;

export const enum TrackableType {
  Social,
  Post,
}

export interface Tracker {
    // unique uid for the particular social
    uid: string;

    // uid to what we are tracking
    trackable_uid: string;

    // type of item being track - is it a social or a page?
    trackable_type: TrackableType

    // Analytics - how many times this social has been viewed by users?
    views: bigint
}

@Schema()
export class Tracker {
  @Prop({required: true})
  uid: string

  @Prop({required: true})
  trackable_uid: string;

  @Prop({required: true})
  trackable_type: TrackableType

  @Prop({default: 0})
  views: bigint
}

export const TrackerSchema = SchemaFactory.createForClass(Tracker);