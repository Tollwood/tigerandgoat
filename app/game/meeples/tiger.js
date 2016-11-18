"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var meeple_1 = require('./meeple');
var Tiger = (function (_super) {
    __extends(Tiger, _super);
    function Tiger(id, position) {
        this.color = "blue";
        this.id = id;
        this.position = position;
    }
    return Tiger;
}(meeple_1.Meeple));
exports.Tiger = Tiger;
//# sourceMappingURL=tiger.js.map