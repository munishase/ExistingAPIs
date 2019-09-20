import { EnumPartOf } from '../Enum/EnumPartOf'
import { Logger } from './Logger'
import { EnumModule } from '../Enum/EnumModule';

//this class will contain all the functions, used commonly throughout the application
class Common {

    //generate random password with length as input param
    randomPassword(length: number): string {
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var pass = "";
        for (var x = 0; x < length; x++) {
            var i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        return pass;
    }

    //return current datetime with a format
    currentDatetime(): string {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = "H" + today.getHours() + "M" + today.getMinutes() + "S" + today.getSeconds();

        return date + '#' + time;
    }

    //wrap the error in code 400 and further return
    beautifyError(errorLogs: any, response: any): any {
        return response.status(400).send(
            errorLogs
        );
    }

    //wrap the success result in code 200 and further return
    beautifySuccess(successLogs: any, response: any): any {
        return response.status(200).send(
            successLogs
        );
    }

    //it examine the result and wrap it in correct code and send further
    beautifyResult(result: any, webResponse: any, enumPartOf: any) {
        Logger.writeLogs();

        if (enumPartOf == EnumPartOf.Individual)
            return (Logger.hasErrorLogs() == true ? this.beautifyError(Logger.getErrorLogs(), webResponse) : this.beautifySuccess(result, webResponse));
        else {
            //if all failed
            if (Logger.getErrorLogsLength() == Logger.getAllLogsLength())
                return this.beautifyError(Logger.getErrorLogs(), webResponse)
            //if all success
            else if (Logger.getSucessLogsLength() == Logger.getAllLogsLength())
                return this.beautifySuccess(result, webResponse)
            //if mixed result
            else {
                let errorModules: EnumModule[] = Logger.getErrorModuleNames();
                let finalResult: any = [];

                //find the error logs
                for (let counter = 0; counter < errorModules.length; counter++)
                    finalResult.push(Logger.filterLogs(errorModules[counter]));

                //find the success result
                for (let i = 0; i < result.length; i++) {
                    for (let j = 0; j < errorModules.length; j++)
                        if (result[i].module != errorModules[j])
                            finalResult.push(result[i]);
                }

                //as this result is mixed of success & failure, so we consider it as failed as send as error
                return this.beautifyError(finalResult, webResponse);
            }
        }
    }

    pushtoCollectionResult(collection: any, record: any) {
        if (Logger.hasErrorLogs() == false) {
            collection.push(record);
        }
    }

    replaceCurleBrasesInUrl(fullUrl: string, replacedString: string) {
        return  fullUrl.replace(/{(.*?)}/, replacedString)
    }
}



export default new Common();