import { DataSource } from "typeorm";
import { getDataSourceOptions } from "./dbSourceOptions";

const connectionsMap = new Map<string, DataSource>();

async function getClientConnection(client: string) {  
  
  if (connectionsMap.has(client)) {
    return connectionsMap.get(client);
  }

  const source = new DataSource(getDataSourceOptions(client));
  const connection = await source.initialize()
  connectionsMap.set(client, connection);
  return connection;
}

export default getClientConnection