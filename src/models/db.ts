import {DataSource, ModelConfig, ObjectDic} from './config';
import Metadata from './metadata';
import IDB from './idb';
import IProvider from './iprovider';
import Provider from './provider';
import {MongoClient, MongoClientOptions} from 'mongodb';

class DB implements IDB {

  protected cache = new Map<Function, Provider>();
  protected connection = new Map<DataSource, Object>();

  protected modelConfigs: ObjectDic<ModelConfig>;
  protected connectionStrings: ObjectDic<DataSource>;

  constructor (modelConfigs: ObjectDic<ModelConfig>, connectionStrings: ObjectDic<DataSource>) {
    this.modelConfigs = modelConfigs;
    this.connectionStrings = connectionStrings;
  }


  createConnection (ds: DataSource) {
    let result = this.connection.get(ds);
    if (result) return result;

    switch (ds.connector) {
      case 'mongo':
      default:
        result = MongoClient.connect(ds.connectionStrings, ds.options as MongoClientOptions);
    }

    this.connection.set(ds, result);
    return result;
  }


  getConnectionString (constructor: Function) : String {
    let schema = Metadata.get(constructor);
    let config = this.modelConfigs[constructor.name];
    let dataSource = config.dataSource as String || schema.dataSource;
    let collection = config.collection as String || schema.collection;
    if (!dataSource) throw new Error(`not find ds: ${dataSource}`);
    
    return {this.connectionStrings[dataSource], }
  } 

  Provider<T> (constructor: Function) : IProvider<T> {
    let result = this.cache.get(constructor) as Provider<T>;
    if (result) return result;
    result = new Provider<T>(constructor);
    this.cache.set(constructor, result);
    return result;

  }
}