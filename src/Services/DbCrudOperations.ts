import { BaseLayer } from './BaseLayer';
import { MongoClient } from 'mongodb';


//this class will contain all the functions, used to interation with db
class DbCrudOperations extends BaseLayer {


  //generate random password with length as input param
  async saveRecord(record: any) {
    const dbname = this.environmentConfig.database.dbname;
    if (this.environmentConfig.database.enabled == true) {
      const client = await new MongoClient(this.dbConnectionString());
      await client.connect();
      const db = client.db();
      const collection = db.collection(dbname);
      await collection.insert(record);
      await client.close();
    }
  }

  dbConnectionString() {
    let userpwd = "";
    if (this.environmentConfig.database.username != "")
      userpwd = this.environmentConfig.database.username + ":" + this.environmentConfig.database.password + "@";
    return this.environmentConfig.database.urlprefix + userpwd + this.environmentConfig.database.url;
  }

}

export default new DbCrudOperations();