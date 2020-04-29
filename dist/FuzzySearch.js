"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FuzzySearch = /** @class */ (function () {
    function FuzzySearch(data, fields) {
        this.data = data;
        this.fields = fields;
        this.result = [];
        this.query = "";
        this.time = false;
    }
    FuzzySearch.prototype.setData = function (data) {
        this.data = data;
    };
    FuzzySearch.prototype.setFields = function (fields) {
        this.fields = fields;
    };
    FuzzySearch.prototype.search = function (query) {
        var _this = this;
        if (!query || query == "") {
            return "No query string";
        }
        // console.log("Search for: ", query);
        this.query = query;
        if (this.fields.length == 0) {
            return Error("No index fields defined");
        }
        this.result = [];
        if (this.time)
            console.time("search");
        this.data.forEach(function (si) {
            var fieldIDs = [];
            _this.fields.forEach(function (field) {
                fieldIDs.push(Object.keys(si).indexOf(field));
            });
            fieldIDs.forEach(function (id) {
                var data = Object.values(si)[id];
                if (typeof data == "string") {
                    data = data.match(/\w+/g);
                }
                if (_this.TestArray(data, _this.query)) {
                    _this.result.push(si);
                    return;
                }
            });
        });
        if (this.time)
            console.timeEnd("search");
        return this.result;
    };
    FuzzySearch.prototype.TestArray = function (arr, qs) {
        var _this = this;
        var output = false;
        arr.forEach(function (word) {
            // this is how strict the matching is
            var subs = 1;
            if (word.length >= 5)
                subs++;
            if (word.length >= 8)
                subs++;
            // console.log("matching on distance:", subs);
            if (_this.ld(qs, word) <= subs) {
                output = true;
                return;
            }
        });
        return output;
    };
    FuzzySearch.prototype.ld = function (a, b) {
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
            return 0;
        }
        return u[n];
    };
    return FuzzySearch;
}());
exports.FuzzySearch = FuzzySearch;
