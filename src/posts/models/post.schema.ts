import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'database/abstract.schema';

@Schema({ versionKey: false, timestamps: true })
export class PostDocument extends AbstractDocument {
  @Prop()
  userId: string;

  @Prop()
  content: string;

  @Prop()
  imageUrl?: string;

  @Prop()
  tags?: string[];
}

export const PostSchema = SchemaFactory.createForClass(PostDocument);
