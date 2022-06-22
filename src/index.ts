import "dotenv/config";
import express from "express";

import routes from "./routes";
import { PORT } from "./constants";

const main = async () => {
  const app = express();

  app.use("/", routes);

  app.listen(PORT, () => {
    console.log(`Server running on port: \x1b[32m${PORT}\x1b[0m`);
  });
};

main().catch((err) => {
  console.error("\x1b[31mSomething went wrong:\x1b[0m ", err);
});
