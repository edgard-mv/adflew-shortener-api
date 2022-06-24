import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";

import routes from "./routes";
import { PORT } from "./constants";
import dbConnect from "config/db.config";

const main = async () => {
  const app = express();

  dbConnect();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", routes);

  app.listen(PORT, () => {
    console.log(`Server running on port: \x1b[32m${PORT}\x1b[0m`);
  });
};

main().catch((err) => {
  console.error("\x1b[31mSomething went wrong:\x1b[0m ", err);
});
