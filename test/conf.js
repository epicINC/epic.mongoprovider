
module.exports = {
 

  dataSources: {
    redis: {
      host: '192.168.16.151',
      port: 6379,
      scope: 'Groupv3Scope',
      connector: 'mongodb'
    },
    test: {
      connectionStrings: 'mongodb://192.168.16.151/test',
      connector: 'mongodb'
    }
  },
  
  'model-config': {
    test: {
      collection: 'test',
      dataSource: 'test',

    }
  }

};

