import * as yargs from 'yargs';
export declare class ConfigCommand implements yargs.CommandModule {
    command: string;
    describe: string;
    builder(args: yargs.Argv): yargs.Argv<{
        n: string;
    } & {
        c: string;
    } & {
        r: string;
    }>;
    handler(args: yargs.Arguments): Promise<void>;
}
