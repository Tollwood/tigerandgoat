"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var meeple_1 = require('./meeple');
var Goat = (function (_super) {
    __extends(Goat, _super);
    function Goat(id, position) {
        this.color = "red";
        this.id = id;
        this.position = position;
    }
    return Goat;
}(meeple_1.Meeple));
exports.Goat = Goat;
//# sourceMappingURL=goat.js.map