const Db = require('./DB');
const {
    join
} = require('path');

const dbFile = join('dbs.json');

//lowdb
/*const low = require('lowdb');
const FileSysnc = require("lowdb/adapters/FileSync");
const adapter = new FileSysnc(dbFile);
const dbs = low(adapter);*/

const loki = require('lokijs');
const lokiAdapter = require('./lokiadapter');
const ldb = new loki(dbFile);
const lokiAdp = new lokiAdapter(ldb);

const db = new Db(lokiAdp);

db.init('users');
db.add({
    collection: 'users',
    data: {
        name: 'pablito',
        age: 32
    }
});

console.log(db.get('users'));