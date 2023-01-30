import { DataSource } from "typeorm";
import { getDataSourceOptions } from "./dbSourceOptions";

const connectionsMap = new Map<string, DataSource>();

async function getClientConnection(tenant: string) {

  if (connectionsMap.has(tenant)) {
    return connectionsMap.get(tenant);
  }
  
  const source = new DataSource(getDataSourceOptions(tenant));
  const connection = await source.initialize()
  connectionsMap.set(tenant, connection);
  return connection;
}

export default getClientConnection