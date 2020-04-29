
export interface SearchItem {
    // id:          string;
    // name:        string;
    // description: string;
    // tags:        string[];
    [propName: string]: any;
}


export class FuzzySearch {
    data: SearchItem[];
    result: SearchItem[];
    private fields: string[];
    private query: string;
    time: boolean;

    constructor(data: SearchItem[], fields: string[]) {
        this.data = data
        this.fields = fields
        this.result = []
        this.query = "";
        this.time = false;
    }

    setData(data: SearchItem[]) {
        this.data = data
    }
    setFields(fields: string[]) {
        this.fields = fields
    }


    search(query: string) {
        if (!query || query == "") {
            return "No query string"
        }
        // console.log("Search for: ", query);
        this.query = query
        if (this.fields.length == 0) {
            return Error("No index fields defined")
        }
        this.result = []

        if (this.time) console.time("search")

        this.data.forEach((si: SearchItem) => {
            let fieldIDs: number[] = []
            this.fields.forEach((field) => {
                fieldIDs.push(Object.keys(si).indexOf(field))
            })
            fieldIDs.forEach(id => {
                let data: string | string[] = Object.values(si)[id]

                if (typeof data == "string") {
                    data = data.match(/\w+/g)!
                }

                if (this.TestArray(data, this.query)) {
                    this.result.push(si)
                    return
                }
            });

        })
        if (this.time) console.timeEnd("search");
        return this.result

    }


    private TestArray(arr: string[], qs: string): boolean {
        let output: boolean = false;
        arr.forEach((word) => {

            // this is how strict the matching is
            let subs = 1
            if (word.length >= 5) subs++
            if (word.length >= 8) subs++
            // console.log("matching on distance:", subs);

            if (this.ld(qs, word) <= subs) {
                output = true
                return
            }
        })
        return output
    }

    private ld(a: string, b: string): number {
        var t = [], u, i, j, m = a.length, n = b.length;
        if (!m) {
            return n;
        }
        if (!n) {
            return m;
        }
        for (j = 0; j <= n; j++) {
            t[j] = j;
        }
        for (i = 1; i <= m; i++) {
            for (u = [i], j = 1; j <= n; j++) {
                u[j] = a[i - 1] === b[j - 1] ? t[j - 1] : Math.min(t[j - 1], t[j], u[j - 1]) + 1;
            }
            t = u;
        }
        if (!u) {
            return 0
        }
        return u[n];
    }
}


