#!/usr/bin/env nod
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var yargs = require("yargs");
var seed_command_1 = require("./commands/seed.command");
var config_command_1 = require("./commands/config.command");
yargs
    .usage('Usage: $0 <command> [options]')
    .command(new config_command_1.ConfigCommand())
    .command(new seed_command_1.SeedCommand())
    .recommendCommands()
    .demandCommand(1)
    .strict()
    .help('h')
    .alias('h', 'help').argv;
//# sourceMappingURL=cli.js.map