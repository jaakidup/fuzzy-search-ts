import { FuzzySearch, SearchItem } from "./FuzzySearch"
let data = require("../data.json") as SearchItem[]

const fs = new FuzzySearch(data, ["tags"]);
fs.time = true

console.log(fs.search("something"));






