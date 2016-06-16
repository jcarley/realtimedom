import _ from 'lodash';
import Promise from 'bluebird';
import connect from 'rethinkdbdash';

let r = connect();

let createDatabase = (config) => {
  console.log(1, `Using or creating ${config.databaseName} database.`);
  return new Promise((resolve, reject) => {
    r.dbList().run().then((result) => {
      if (!result.includes(config.databaseName)) {
        r.dbCreate(config.databaseName).run().then((result) => {
          resolve(config);
        });
      } else {
        resolve(config);
      }
    }).catch((err) => {
      console.log('==========');
      console.log(err);
    });
  });
};

let createTable = (config) => {
  console.log(2, `Using or creating ${config.tableName} table.`);
  return new Promise((resolve, reject) => {
    r.db(config.databaseName).tableList().run().then((result) => {
      if (!result.includes(config.tableName)) {
        r.db(config.databaseName).tableCreate(config.tableName).run().then((result) => {
          resolve(config);
        });
      } else {
        resolve(config);
      }
    });
  });
};

let configureDatabase = () => {
  let config = {
    databaseName: 'tappr',
    tableName: 'files'
  };

  return createDatabase(config)
    .then(createTable);
};

let bulkInsertFiles = () => {
  let files = _.range(1, 1000).map((index) => {
    return {
      name: `myimage${index}.jpg`,
      size: 1024 * index,
      dateImported: Date.now()
    }
  });

  console.log(3, "Bulk inserting test records");
  return new Promise((resolve, reject) => {
    r.db('tappr').table('files').insert(files).run().then((result) => {
      resolve(result);
    });
  });
};

let purgeFiles = () => {
  console.log(4, "Purging files table.");
  return new Promise((resolve, reject) => {
    r.db('tappr').table('files').delete().run().then((result) => {
      resolve();
    });
  });
};

configureDatabase()
  .then(bulkInsertFiles)
  .then(purgeFiles)
  .then(() => r.getPoolMaster().drain());

