"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.importSeed = function (filePath) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var seedFileObject, keys;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require(filePath); })];
            case 1:
                seedFileObject = _a.sent();
                keys = Object.keys(seedFileObject);
                return [2 /*return*/, seedFileObject[keys[0]]];
        }
    });
}); };
//# sourceMappingURL=importer.js.map