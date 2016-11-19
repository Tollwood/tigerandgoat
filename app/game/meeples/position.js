"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Position = (function (_super) {
    __extends(Position, _super);
    function Position(x, y) {
        _super.call(this);
        this.x = x;
        this.y = y;
        this.occupied = false;
    }
    return Position;
}(createjs.Container));
exports.Position = Position;
//# sourceMappingURL=position.js.map