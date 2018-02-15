import {Db, IDbGetParams, IFromDbOptions, Json, Model, SakuraApi, SapiModelMixin} from '@sakuraapi/core';
import {
  Collection,
  CollectionInsertOneOptions,
  CollectionOptions,
  Cursor,
  Db as MongoDb,
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  ObjectID,
  ReplaceOneOptions,
  UpdateWriteOpResult
} from 'mongodb';
import {dbs} from '../config/bootstrap/db';

export {
  Collection,
  CollectionInsertOneOptions,
  CollectionOptions,
  Cursor,
  MongoDb,
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  ObjectID,
  ReplaceOneOptions,
  UpdateWriteOpResult,
  IDbGetParams,
  IFromDbOptions,
  SakuraApi
};

@Model({
  dbConfig: dbs.user
})
export class UserModel extends SapiModelMixin() {
  @Db({field: 'email'}) @Json()
  email: string;
  @Db({field: 'password'}) @Json()
  password: string;
  @Db({field: 'firstName'}) @Json()
  firstName: string;
  @Db({field: 'lastName'}) @Json()
  lastName: string;
  @Db({field: 'phone'}) @Json()
  phone: string;
}
