import { DataSource } from "typeorm"
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "mongodb",
    database: "escola",
    //url: `${process.env.DB}`,
    host: "localhost",
    port: 27017,
    // username: null,
    // password: null,
    synchronize: true,
    logging: false,
    entities: [
      __dirname + "/models/*.ts"
    ],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado!"); //sucesso na promessa
  })
  .catch((e) => {
    console.error("Erro na inicialização do Data Source:", e);
  });

export default AppDataSource;