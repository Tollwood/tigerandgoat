"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Meeple = (function (_super) {
    __extends(Meeple, _super);
    function Meeple(id, x, y, animal) {
        _super.call(this);
        this.id = id;
        this.x = x;
        this.y = y;
        this.animal = animal;
    }
    return Meeple;
}(createjs.Container));
exports.Meeple = Meeple;
//# sourceMappingURL=meeple.js.map