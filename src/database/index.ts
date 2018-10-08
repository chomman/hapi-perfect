import Logger from '../helper/logger';

export default class Database {
    private static _instance: Database;

    public static connect(_config: {}) {}

    public static async createSchema() {
        /**
         * Users table
         *  -> id (primary)
         *  -> username
         *  -> password
         *  -> email
         *  -> access
         */
    }

    public static async createTable(_tableName: string, _tableStructure: any, _thenAction?: any) {}

    public static async migrateTask(_tableName: string, _tableStructure: any, _thenAction?: any) {}

    public static async register(_config: {}) {
        Logger.info('Database - Ready to use');
    }

    public static instance(): Database {
        return Database._instance;
    }
}
