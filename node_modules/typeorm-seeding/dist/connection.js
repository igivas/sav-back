"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var log_util_1 = require("./utils/log.util");
var KEY = 'TypeORM_Seeding_Connection';
var defaultConfigureOption = {
    root: process.cwd(),
    configName: '',
    connection: '',
};
if (global[KEY] === undefined) {
    ;
    global[KEY] = {
        configureOption: defaultConfigureOption,
        ormConfig: undefined,
        connection: undefined,
        overrideConnectionOptions: {},
    };
}
exports.configureConnection = function (option) {
    if (option === void 0) { option = {}; }
    ;
    global[KEY].configureOption = tslib_1.__assign(tslib_1.__assign({}, defaultConfigureOption), option);
};
exports.setConnectionOptions = function (options) {
    ;
    global[KEY].overrideConnectionOptions = options;
};
exports.getConnectionOptions = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var ormConfig, overrideConnectionOptions, configureOption, connection_1, reader, options, filteredOptions, filteredOptions, option;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ormConfig = global[KEY].ormConfig;
                overrideConnectionOptions = global[KEY].overrideConnectionOptions;
                if (!(ormConfig === undefined)) return [3 /*break*/, 2];
                configureOption = global[KEY].configureOption;
                connection_1 = configureOption.connection;
                reader = new typeorm_1.ConnectionOptionsReader({
                    root: configureOption.root,
                    configName: configureOption.configName,
                });
                return [4 /*yield*/, reader.all()];
            case 1:
                options = (_a.sent());
                if (connection_1 !== undefined && connection_1 !== '') {
                    filteredOptions = options.filter(function (o) { return o.name === connection_1; });
                    if (filteredOptions.length === 1) {
                        options = filteredOptions;
                    }
                }
                if (options.length > 1) {
                    filteredOptions = options.filter(function (o) { return o.name === 'default'; });
                    if (filteredOptions.length === 1) {
                        options = filteredOptions;
                    }
                }
                if (options.length === 1) {
                    option = options[0];
                    if (!option.factories) {
                        option.factories = [process.env.TYPEORM_SEEDING_FACTORIES || 'src/database/factories/**/*{.ts,.js}'];
                    }
                    if (!option.seeds) {
                        option.seeds = [process.env.TYPEORM_SEEDING_SEEDS || 'src/database/seeds/**/*{.ts,.js}'];
                    }
                    ;
                    global[KEY].ormConfig = tslib_1.__assign(tslib_1.__assign({}, option), overrideConnectionOptions);
                    return [2 /*return*/, global[KEY].ormConfig];
                }
                log_util_1.printError('There are multiple connections please provide a connection name');
                _a.label = 2;
            case 2: return [2 /*return*/, ormConfig];
        }
    });
}); };
exports.createConnection = function (option) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var configureOption, connection, ormConfig, _1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                configureOption = global[KEY].configureOption;
                connection = global[KEY].connection;
                ormConfig = global[KEY].ormConfig;
                if (option !== undefined) {
                    ormConfig = option;
                }
                if (!(connection === undefined)) return [3 /*break*/, 7];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, typeorm_1.getConnection(configureOption.name)];
            case 2:
                connection = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                _1 = _a.sent();
                return [3 /*break*/, 4];
            case 4:
                if (!(connection === undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, typeorm_1.createConnection(ormConfig)];
            case 5:
                connection = _a.sent();
                _a.label = 6;
            case 6:
                ;
                global[KEY].connection = connection;
                _a.label = 7;
            case 7: return [2 /*return*/, connection];
        }
    });
}); };
//# sourceMappingURL=connection.js.map