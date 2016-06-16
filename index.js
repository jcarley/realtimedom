import _ from 'lodash';
import Promise from 'bluebird';
import connect from 'rethinkdbdash';
import colors from 'colors';

let r = connect();

// create the tappr database
let createDatabase = (config) => {
  console.log(`Using or creating ${config.databaseName} database.`.blue);
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

// create the files database
let createTable = (config) => {
  console.log(`Using or creating ${config.tableName} table.`.blue);
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

// setup database artifacts
let configureDatabase = () => {
  let config = {
    databaseName: 'tappr',
    tableName: 'files'
  };

  return createDatabase(config)
    .then(createTable);
};

// bulk insert a bunch of records
let bulkInsertFiles = () => {
  let files = _.range(1, 1000).map((index) => {
    return {
      name: `myimage${index}.jpg`,
      size: 1024 * index,
      dateImported: Date.now()
    }
  });

  console.log("Bulk inserting test records".blue);
  return new Promise((resolve, reject) => {
    r.db('tappr').table('files').insert(files).run().then((result) => {
      resolve(result);
    });
  });
};

// subscribe to the files table changefeed
let subscribeToChangeFeed = () => {
  r.db('tappr').table('files').changes().run({cursor: true}).then((cursor) => {
    cursor.each(logAction);
  });
};

let logAction = (err, changeRecord) => {
  let type = "";
  if (changeRecord.new_val != null && changeRecord.old_val == null) {
    type = "Record inserted".green;
  } else if (changeRecord.new_val != null && changeRecord.old_val != null) {
    type = "Record updated".green;
  } else if (changeRecord.new_val == null && changeRecord.old_val != null) {
    type = "Record deleted".green;
  }

  console.log(type);
  console.log(changeRecord);
};

// delete everything in the files table
let purgeFiles = () => {
  console.log("Purging files table.".blue);
  return new Promise((resolve, reject) => {
    r.db('tappr').table('files').delete().run().then((result) => {
      resolve();
    });
  });
};

configureDatabase()
  .then(bulkInsertFiles)
  .then(subscribeToChangeFeed)
  // .then(purgeFiles)
  // .then(() => r.getPoolMaster().drain());



