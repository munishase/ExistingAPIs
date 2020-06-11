export class GroupedResults {
    actualResult: unknown;
    customResult: unknown;

    //it will create one response of activeport ntu and ntu port creation and simplify that response
    constructor(actualResult: unknown, customResult: unknown) {
        this.actualResult = actualResult;
        this.customResult = customResult;
    }
}

