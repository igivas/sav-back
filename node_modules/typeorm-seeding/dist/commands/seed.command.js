"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ora = require("ora");
var chalk = require("chalk");
var importer_1 = require("../importer");
var file_util_1 = require("../utils/file.util");
var typeorm_seeding_1 = require("../typeorm-seeding");
var connection_1 = require("../connection");
var SeedCommand = /** @class */ (function () {
    function SeedCommand() {
        this.command = 'seed';
        this.describe = 'Runs the seeds';
    }
    SeedCommand.prototype.builder = function (args) {
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
        })
            .option('seed', {
            alias: 's',
            describe: 'Specific seed class to run.',
        });
    };
    SeedCommand.prototype.handler = function (args) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var log, pkg, spinner, configureOption, option, error_1, factoryFiles, error_2, seedFiles, seedFileObjects, error_3, error_4, _i, seedFileObjects_1, seedFileObject, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log = console.log;
                        pkg = require('../../package.json');
                        log('🌱  ' + chalk.bold("TypeORM Seeding v" + pkg.version));
                        spinner = ora('Loading ormconfig').start();
                        configureOption = {
                            root: args.root,
                            configName: args.configName,
                            connection: args.connection,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        connection_1.configureConnection(configureOption);
                        return [4 /*yield*/, connection_1.getConnectionOptions()];
                    case 2:
                        option = _a.sent();
                        spinner.succeed('ORM Config loaded');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        panic(spinner, error_1, 'Could not load the config file!');
                        return [3 /*break*/, 4];
                    case 4:
                        // Find all factories and seed with help of the config
                        spinner.start('Import Factories');
                        factoryFiles = file_util_1.loadFiles(option.factories);
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, file_util_1.importFiles(factoryFiles)];
                    case 6:
                        _a.sent();
                        spinner.succeed('Factories are imported');
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        panic(spinner, error_2, 'Could not import factories!');
                        return [3 /*break*/, 8];
                    case 8:
                        // Show seeds in the console
                        spinner.start('Importing Seeders');
                        seedFiles = file_util_1.loadFiles(option.seeds);
                        seedFileObjects = [];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, Promise.all(seedFiles.map(function (seedFile) { return importer_1.importSeed(seedFile); }))];
                    case 10:
                        seedFileObjects = _a.sent();
                        seedFileObjects = seedFileObjects.filter(function (seedFileObject) { return args.seed === undefined || args.seed === seedFileObject.name; });
                        spinner.succeed('Seeders are imported');
                        return [3 /*break*/, 12];
                    case 11:
                        error_3 = _a.sent();
                        panic(spinner, error_3, 'Could not import seeders!');
                        return [3 /*break*/, 12];
                    case 12:
                        // Get database connection and pass it to the seeder
                        spinner.start('Connecting to the database');
                        _a.label = 13;
                    case 13:
                        _a.trys.push([13, 15, , 16]);
                        return [4 /*yield*/, connection_1.createConnection()];
                    case 14:
                        _a.sent();
                        spinner.succeed('Database connected');
                        return [3 /*break*/, 16];
                    case 15:
                        error_4 = _a.sent();
                        panic(spinner, error_4, 'Database connection failed! Check your typeORM config file.');
                        return [3 /*break*/, 16];
                    case 16:
                        _i = 0, seedFileObjects_1 = seedFileObjects;
                        _a.label = 17;
                    case 17:
                        if (!(_i < seedFileObjects_1.length)) return [3 /*break*/, 22];
                        seedFileObject = seedFileObjects_1[_i];
                        spinner.start("Executing " + seedFileObject.name + " Seeder");
                        _a.label = 18;
                    case 18:
                        _a.trys.push([18, 20, , 21]);
                        return [4 /*yield*/, typeorm_seeding_1.runSeeder(seedFileObject)];
                    case 19:
                        _a.sent();
                        spinner.succeed("Seeder " + seedFileObject.name + " executed");
                        return [3 /*break*/, 21];
                    case 20:
                        error_5 = _a.sent();
                        panic(spinner, error_5, "Could not run the seed " + seedFileObject.name + "!");
                        return [3 /*break*/, 21];
                    case 21:
                        _i++;
                        return [3 /*break*/, 17];
                    case 22:
                        log('👍 ', chalk.gray.underline("Finished Seeding"));
                        process.exit(0);
                        return [2 /*return*/];
                }
            });
        });
    };
    return SeedCommand;
}());
exports.SeedCommand = SeedCommand;
function panic(spinner, error, message) {
    spinner.fail(message);
    console.error(error);
    process.exit(1);
}
//# sourceMappingURL=seed.command.js.map