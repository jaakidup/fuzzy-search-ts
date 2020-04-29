"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.time("total");
const ld_1 = require("./ld");
let data = require("../data.json");
// ***************************************************************** //
// let indexFields: string[] = ["name", "description", "tags"]
let indexFields = ["description", "name"];
// let indexFields: string[] = ["name"]
let qv = 2;
let qs = "some";
// ***************************************************************** //
let result = [];
// data.forEach((person: Person) => {
data.forEach((person) => {
    let fieldIDs = [];
    indexFields.forEach((field) => {
        fieldIDs.push(Object.keys(person).indexOf(field));
    });
    fieldIDs.forEach(id => {
        let data = Object.values(person)[id];
        if (typeof data == "string") {
            data = data.match(/\w+/g);
        }
        if (TestArray(data, qs, qv)) {
            result.push(person);
            return;
        }
    });
});
function TestArray(arr, qs, wv) {
    let output = false;
    arr.forEach((word) => {
        if (ld_1.ld(qs, word) <= wv) {
            output = true;
            return;
        }
    });
    return output;
}
console.timeEnd("total");
console.log(result);
