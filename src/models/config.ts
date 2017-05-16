


export type DataSource = {
  connector: string;
  [P: string]: any
};

export type ModelConfig = {
  collection: String;
  dataSource: String;
};


export type ObjectDic<T> = {
  [P: string]: T;
};