import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SchoolDocument } from './School.schema';
import { Role } from '../middleware/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, type: Types.ObjectId, ref: 'School' })
  school: SchoolDocument;
  @Prop({ required: true, unique: true })
  userName: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  role: Role;
}
export const UserSchema = SchemaFactory.createForClass(User);
