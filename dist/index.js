"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.time("total");
const ld_1 = require("./ld");
let data = require("../data.json");
// ***************************************************************** //
// let indexFields: string[] = ["name", "description", "tags"]
// let indexFields: string[] = ["description", "tags", "name"]
let indexFields = ["tags"];
let qv = 2;
let qs = "bicycle";
// ***************************************************************** //
let result = [];
data.forEach((person) => {
    let fieldIDs = [];
    indexFields.forEach((field) => {
        fieldIDs.push(Object.keys(person).indexOf(field));
    });
    fieldIDs.forEach(id => {
        let data = Object.values(person)[id];
        // console.log("type", typeof data, "Data:", data);
        let dataArray = [];
        let found = false;
        if (typeof data == "string") {
            // console.log("data string: ", data);
            let matchArray = data.match(/\w+/g);
            console.log(matchArray);
            if (matchArray) {
                if (TestArray(matchArray, qs, qv)) {
                    result.push(person);
                    found = true;
                    return;
                }
            }
        }
        if (Array.isArray(data)) {
            //  console.log("data is array");
            if (TestArray(data, qs, qv)) {
                result.push(person);
                found = true;
                return;
            }
        }
        if (found) {
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
