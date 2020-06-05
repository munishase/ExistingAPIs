import { Log } from './Log'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
const uuidv1 = require('uuid');
const fs = require('fs');
import Common from './Common'
import { EnumModule } from '../Enum/EnumModule';


export class Logger {

    private static id: string;
    private static logs: Log[] = [];
    static dirname = "logs"

    //return all the logs
    static getAllLogs(): Logger {
        return ({
            'id': this.id,
            'logs': this.logs
        });
    }

    //filter logs by module
    static filterLogs(module: EnumModule) {
        return ({
            'id': this.id,
            'logs': this.logs.filter(i => i.module == module)
        });
    }

    //get module names with errors
    static getErrorModuleNames(): EnumModule[] {
        let listlog = this.getErrorLogs().logs as Log[];
        let listEnumModule: EnumModule[] = [];
        if (listlog != undefined) {
            for (var i = 0; i < listlog.length; i++) {
                if (!(listEnumModule.indexOf(listlog[i].module) >= 0))
                    listEnumModule.push(listlog[i].module);
            }
        }
        return listEnumModule;
    }

    //return all the logs length
    static getAllLogsLength(): number {
        return this.logs.length;
    }

    //update the logger
    static updateLogs(log: Log) {
        if (this.logs.length == 0)
            this.id = uuidv1();

        this.logs.push(log);
    }

    //clean the logger
    static cleanLogs() {
        this.logs.splice(0, this.logs.length);
        this.id = '';
    }

    //validate if there is any error in logs
    static hasErrorLogs(): boolean {
        return ((this.logs.filter(i => i.status == EnumCurrentStatus.Error).length > 0) ? true : false);
    }

    //return errors from logs collection
    static getErrorLogs(): any {
        return ({
            'id': this.id,
            'logs': this.logs.filter(i => i.status == EnumCurrentStatus.Error)
        });
    }

    //error log length
    static getErrorLogsLength(): number {
        return this.logs.filter(i => i.status == EnumCurrentStatus.Error).length;

    }

    //return errors from logs collection
    static getSucessLogs(): any {
        return ({
            'id': this.id,
            'logs': this.logs.filter(i => i.status == EnumCurrentStatus.Success)
        });
    }

    //return errors from logs collection
    static getSucessLogsLength(): number {
        return this.logs.filter(i => i.status == EnumCurrentStatus.Success).length;
    }

    //write log file in logd folder
    static writeLogs() {
        let instance = this;
        //file name is combination of current datetime and auto generated id
        let filename = Common.currentDatetime() + "-" + this.id + ".log";
        let filepath = instance.dirname + "\\" + filename;
        this.createLogFileIfDoesNotExists(instance.dirname, filepath);

        fs.open(filepath, 'r', function (err: any, fd: any) {
            fs.appendFile(filepath, JSON.stringify(instance.getAllLogs()), function (err: any) {
                if (err) {
                    console.log(err);
                }
            });
        });
    }

    private static createLogFileIfDoesNotExists(dirname: string, filepath: string) {
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname);
        }

        fs.open(filepath, 'r', function (err: any, fd: any) {
            if (err) {
                fs.writeFile(filepath, '', function (err: any) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    }
}