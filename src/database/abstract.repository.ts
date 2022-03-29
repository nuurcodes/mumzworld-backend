import { Logger, NotFoundException } from '@nestjs/common';
import { Model, Types, FilterQuery, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filter query', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    const documents = await this.model.find(filterQuery, {}, { lean: true });

    if (!documents) {
      this.logger.warn('Document not found with filter query', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return documents;
  }

  // TODO: Remove finding first
  async updateOne(updateQuery: UpdateQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(
      { _id: updateQuery.userId },
      {},
      { lean: true },
    );

    if (!document) {
      this.logger.warn('Document not found with update query', updateQuery);
      throw new NotFoundException('Document not found');
    }

    await this.model.updateOne({ _id: updateQuery.userId }, {}, { lean: true });
    return document;
  }

  async delete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filter query', filterQuery);
      throw new NotFoundException('Document not found');
    }

    await this.model.deleteOne(filterQuery, {});
    return document;
  }
}
