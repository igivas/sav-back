import { Connection as TypeORMConnection, ConnectionOptions as TypeORMConnectionOptions } from 'typeorm';
interface SeedingOptions {
    factories: string[];
    seeds: string[];
}
export declare type ConnectionOptions = TypeORMConnectionOptions & SeedingOptions;
export interface ConfigureOption {
    root?: string;
    configName?: string;
    connection?: string;
}
export declare const configureConnection: (option?: ConfigureOption) => void;
export declare const setConnectionOptions: (options: Partial<import("typeorm/driver/cockroachdb/CockroachConnectionOptions").CockroachConnectionOptions> | Partial<import("typeorm/driver/mysql/MysqlConnectionOptions").MysqlConnectionOptions> | Partial<import("typeorm/driver/postgres/PostgresConnectionOptions").PostgresConnectionOptions> | Partial<import("typeorm/driver/sqlite/SqliteConnectionOptions").SqliteConnectionOptions> | Partial<import("typeorm/driver/sqlserver/SqlServerConnectionOptions").SqlServerConnectionOptions> | Partial<import("typeorm/driver/oracle/OracleConnectionOptions").OracleConnectionOptions> | Partial<import("typeorm/driver/mongodb/MongoConnectionOptions").MongoConnectionOptions> | Partial<import("typeorm/driver/cordova/CordovaConnectionOptions").CordovaConnectionOptions> | Partial<import("typeorm/driver/sqljs/SqljsConnectionOptions").SqljsConnectionOptions> | Partial<import("typeorm/driver/react-native/ReactNativeConnectionOptions").ReactNativeConnectionOptions> | Partial<import("typeorm/driver/nativescript/NativescriptConnectionOptions").NativescriptConnectionOptions> | Partial<import("typeorm/driver/expo/ExpoConnectionOptions").ExpoConnectionOptions> | Partial<import("typeorm/driver/aurora-data-api/AuroraDataApiConnectionOptions").AuroraDataApiConnectionOptions> | Partial<import("typeorm/driver/sap/SapConnectionOptions").SapConnectionOptions>) => void;
export declare const getConnectionOptions: () => Promise<ConnectionOptions>;
export declare const createConnection: (option?: TypeORMConnectionOptions) => Promise<TypeORMConnection>;
export {};
