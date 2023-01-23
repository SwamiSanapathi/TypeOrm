import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Profile } from "./entity/Profile"
import { Photos } from "./entity/Photos"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "typeorm",
  synchronize: false,
  logging: true,
  entities: [User, Profile, Photos],
  subscribers: [],
  migrations: [],
})
