/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnumSessionForEachRequest } from '../Enum/EnumSessionForEachRequest';
import { EnumResultType } from '../Enum/EnumResultType';
import sessionstorage from 'sessionstorage';

//this class will contain all the functions, used commonly throughout the application
class Common {

    //generate random password with length as input param
    randomPassword(length: number): string {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        let pass = "";
        for (let x = 0; x < length; x++) {
            const i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        return pass;
    }

    //return current datetime with a format
    currentDatetime(): string {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = "H" + today.getHours() + "M" + today.getMinutes() + "S" + today.getSeconds();

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

    replaceCurleBrasesInUrl(fullUrl: string, replacedString: string) {
        return fullUrl.replace(/{(.*?)}/, replacedString)
    }

    jsonToStringWithEscapeCharacter(jsonobject: any) {
        const myJSONString = JSON.stringify(jsonobject, null, 0);
        console.log(JSON.stringify(JSON.stringify(jsonobject, null, 0)))
        return  JSON.stringify(myJSONString)//.slice(1, -1) ;
        //return "\"" + JSON.stringify(myJSONString).slice(1, -1) + "\"";
    }

    createFluidDbObject(request: any, response: any, resultType: EnumResultType) {
        return {
            "uuid": sessionstorage.getItem(EnumSessionForEachRequest.UUID),
            "ApiName": sessionstorage.getItem(EnumSessionForEachRequest.ApiName),
            "result": resultType,
            "module":"FLUID",
            "Request": request,
            "Response": response
        }
    }
}



export default new Common();