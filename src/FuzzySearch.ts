

export class FuzzySearch {
    // private data: 
    private data: any;
    private result: any;

    constructor() {

    }

    setData<T>(data: Array<T>) {
        this.data = data
    }
    getData() {
        return this.data
    }

    search(query: string) {
        return this.result
    }
}


