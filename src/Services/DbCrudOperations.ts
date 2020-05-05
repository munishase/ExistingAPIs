import { EnumPartOf } from '../Enum/EnumPartOf'
import { Logger } from '../class/Logger'
import { EnumModule } from '../Enum/EnumModule';
import { BaseLayer } from './BaseLayer';
var MongoClient = require('mongodb').MongoClient;


//this class will contain all the functions, used to interation with db
class DbCrudOperations extends BaseLayer {

  //generate random password with length as input param
  saveRecord(record: any) {
    var dbConnectionString = this.environmentConfig.database.Url;
    console.log(dbConnectionString)
    MongoClient.connect(dbConnectionString, function (error: any, dbConnection: any) {
      if (error)
        throw error;

      var myStudent = { name: "test data" };
      dbConnection.collection("fluid").insertOne(myStudent, function (error: any, result: any) {
        if (error)
          throw error;
        
        console.log("1 Recorded Inserted");
        dbConnection.close();
      });
    });

  }

}



export default new DbCrudOperations();