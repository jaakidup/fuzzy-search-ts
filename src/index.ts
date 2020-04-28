console.time("total")
import { Person } from "./types"
import { ld } from "./ld"
let data = require("../data.json") as Person[]

// ***************************************************************** //
// let indexFields: string[] = ["name", "description", "tags"]
// let indexFields: string[] = ["description", "tags", "name"]
let indexFields: string[] = ["tags"]
let qv: number = 2;
let qs: string = "bicycle"
// ***************************************************************** //


let result: Person[] = [];

data.forEach((person: Person) => {
    let fieldIDs: number[] = []
    indexFields.forEach((field) => {
        fieldIDs.push(Object.keys(person).indexOf(field))
    })
    fieldIDs.forEach(id => {
        let data: string = Object.values(person)[id]
        // console.log("type", typeof data, "Data:", data);

        let dataArray: string[] = [];
        let found: boolean = false;

        if (typeof data == "string") {
            // console.log("data string: ", data);
            let matchArray = data.match(/\w+/g)
            console.log(matchArray)
            if (matchArray) {
                if (TestArray(matchArray, qs, qv)) {
                    result.push(person)
                    found = true
                    return
                }
            }
        }

        if (Array.isArray(data)) {
            //  console.log("data is array");
            if (TestArray(data, qs, qv)) {
                result.push(person)
                found = true
                return
            }
        }

        if (found) {
            return 
        }
    });
})




function TestArray(arr: string[], qs: string, wv: number): boolean {
    let output: boolean = false;
    arr.forEach((word) => {
        if (ld(qs, word) <= wv) {
            output = true
            return
        }
    })
    return output
}




console.timeEnd("total")

console.log(result);






