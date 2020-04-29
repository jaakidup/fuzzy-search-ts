console.time("total")
import { Person } from "./types"
import { ld } from "./ld"
let data = require("../data.json") as Person[]

// ***************************************************************** //
// let indexFields: string[] = ["name", "description", "tags"]
let indexFields: string[] = ["description", "name"]
// let indexFields: string[] = ["name"]
let qv: number = 2;
let qs: string = "some"
// ***************************************************************** //


let result: Person[] = [];

// data.forEach((person: Person) => {
data.forEach((person: Person) => {
    let fieldIDs: number[] = []
    indexFields.forEach((field) => {
        fieldIDs.push(Object.keys(person).indexOf(field))
    })
    fieldIDs.forEach(id => {
        let data: string | string[] = Object.values(person)[id]

        if (typeof data == "string") {
            data = data.match(/\w+/g)!
        }

        if (TestArray(data, qs, qv)) {
            result.push(person)
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










