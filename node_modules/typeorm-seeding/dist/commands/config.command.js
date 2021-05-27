"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk = require("chalk");
var log_util_1 = require("../utils/log.util");
var connection_1 = require("../connection");
var ConfigCommand = /** @class */ (function () {
    function ConfigCommand() {
        this.command = 'config';
        this.describe = 'Show the TypeORM config';
    }
    ConfigCommand.prototype.builder = function (args) {
        return args
            .option('n', {
            alias: 'configName',
            default: '',
            describe: 'Name of the typeorm config file (json or js).',
        })
            .option('c', {
            alias: 'connection',
            default: '',
            describe: 'Name of the typeorm connection',
        })
            .option('r', {
            alias: 'root',
            default: process.cwd(),
            describe: 'Path to your typeorm config file',
        });
    };
    ConfigCommand.prototype.handler = function (args) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var log, pkg, option, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log = console.log;
                        pkg = require('../../package.json');
                        log('🌱  ' + chalk.bold("TypeORM Seeding v" + pkg.version));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        connection_1.configureConnection({
                            root: args.root,
                            configName: args.configName,
                            connection: args.connection,
                        });
                        return [4 /*yield*/, connection_1.getConnectionOptions()];
                    case 2:
                        option = _a.sent();
                        log(option);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        log_util_1.printError('Could not find the orm config file', error_1);
                        process.exit(1);
                        return [3 /*break*/, 4];
                    case 4:
                        process.exit(0);
                        return [2 /*return*/];
                }
            });
        });
    };
    return ConfigCommand;
}());
exports.ConfigCommand = ConfigCommand;
//# sourceMappingURL=config.command.js.map