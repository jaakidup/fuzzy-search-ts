import { FuzzySearch } from "./FuzzySearch"
let data = require("../data.json")

const search = new FuzzySearch();
search.setData = data

console.log(search.getData());





