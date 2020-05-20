class LokiAdapter {
    constructor(lokiDB){
        this.lokiDB = lokiDB;
        this.collection = null;
        this.op = null;
    }
    defaults(obj){
        this.collection = Object.keys(obj)[0];
        this.op = 'INIT';
        return this;
    }
    get(collection){
        this.collection = this.lokiDB.getCollection(collection);
        return this;
    }
    push(data){
        this.dataToPush = data;
        this.op = "WRITE";
        return this;
    }
    value(){
        return this.collection.find();
    }
    write(){
        if(this.op){
            switch(this.op){
                case 'INIT':
                    this.lokiDB.addCollection(this.collection);
                    this.collection = null;
                    this.op = null;
                    break;

                case "WRITE":
                    this.collection.insert(this.dataToPush);
                    this.dataToPush = null;
                    this.collection = null;
                    this.op = null;
                    break;
            }
            this.lokiDB.saveDatabase();
        }
        return this;
    }

}

module.exports = LokiAdapter;