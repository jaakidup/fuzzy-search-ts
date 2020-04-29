"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FuzzySearch_1 = require("./FuzzySearch");
let data = require("../data.json");
const search = new FuzzySearch_1.FuzzySearch();
search.setData = data;
console.log(search.getData());
