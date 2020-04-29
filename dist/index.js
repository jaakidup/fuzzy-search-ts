"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FuzzySearch_1 = require("./FuzzySearch");
var data = require("../data.json");
var fs = new FuzzySearch_1.FuzzySearch(data, ["tags"]);
fs.time = true;
console.log(fs.search("something"));
