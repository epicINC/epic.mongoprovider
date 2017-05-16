import IProvider from './iprovider';

export interface IDB {
  Provider<T>(constructor: Function) : IProvider<T>;
}

export interface IDBConstructor {
  new (modelConfigs: Object, connectionStrings: Object) : IDB;
}

export default IDB;