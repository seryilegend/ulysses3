import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SchoolDocument = School & Document;

@Schema()
export class School {}
export const SchoolSchema = SchemaFactory.createForClass(School);
