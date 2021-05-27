"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var glob = require("glob");
var path = require("path");
exports.importFiles = function (filePaths) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(filePaths.map(function (filePath) { return Promise.resolve().then(function () { return require(filePath); }); }))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.loadFiles = function (filePattern) {
    return filePattern
        .map(function (pattern) { return glob.sync(path.resolve(process.cwd(), pattern)); })
        .reduce(function (acc, filePath) { return acc.concat(filePath); }, []);
};
//# sourceMappingURL=file.util.js.map