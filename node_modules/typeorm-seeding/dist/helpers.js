"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * Times repeats a function n times
 */
exports.times = function (n, iteratee) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var rs, i, r;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                rs = [];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < n)) return [3 /*break*/, 4];
                return [4 /*yield*/, iteratee(i)];
            case 2:
                r = _a.sent();
                rs.push(r);
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, rs];
        }
    });
}); };
//# sourceMappingURL=helpers.js.map