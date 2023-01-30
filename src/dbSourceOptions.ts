import { DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv'
dotenv.config()

export const getDataSourceOptions = (client: string): DataSourceOptions => {
    return {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: `${client}`,
        synchronize: false,
        logging: true,
        entities: [__dirname + "/entity/*.*"],
        subscribers: [],
        migrations: [],
    }

}