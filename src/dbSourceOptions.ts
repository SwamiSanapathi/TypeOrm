import { DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv'
dotenv.config()

export const getDataSourceOptions = (tenant: string): DataSourceOptions => {
    return {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: `${tenant}`,
        synchronize: false,
        logging: true,
        entities: [__dirname + "/entity/*.*"],
        subscribers: [],
        migrations: [],
    }
}