import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import routes from "./routes";
import { PORT, ORIGIN_WHITELIST } from "./constants";
import dbConnect from "config/db.config";
import redirectionRouter from "routes/redirection";

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (_: Error | null, origin?: any) => void
  ) {
    if (!origin || ORIGIN_WHITELIST.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const main = async () => {
  const app = express();

  dbConnect();

  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", routes);

  app.use("/", redirectionRouter);

  app.listen(PORT, () => {
    console.log(`Server running on port: \x1b[32m${PORT}\x1b[0m`);
  });
};

main().catch((err) => {
  console.error("\x1b[31mSomething went wrong:\x1b[0m ", err);
});
