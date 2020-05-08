import { BaseLayer } from './BaseLayer';
var MongoClient = require('mongodb').MongoClient;


//this class will contain all the functions, used to interation with db
class DbCrudOperations extends BaseLayer {


  //generate random password with length as input param
  saveRecord(record: any) {
    console.log(this.environmentConfig.database.enabled)
    if (this.environmentConfig.database.enabled == true) {
      MongoClient.connect(this.dbConnectionString(), function (error: any, dbConnection: any) {
        if (error)
          throw error;

        dbConnection.collection("fluid").insertOne(record, function (error: any, result: any) {
          if (error)
            throw error;

          dbConnection.close();
        });
      });
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