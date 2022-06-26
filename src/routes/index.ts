import express from "express";
import fs from "fs";
import { removeFileExtension } from "utils/stringManipulation";

const rootRouter = express.Router();

fs.readdirSync(__dirname).forEach(async (fileName) => {
  const routeName = removeFileExtension(fileName);

  if (
    !routeName ||
    routeName === "index" ||
    routeName === "redirection" ||
    fileName.split(".").at(-1) === "map"
  ) {
    return;
  }
  const { default: router } = await import(`./${fileName}`);
  rootRouter.use(`/${routeName}`, router);
});

export default rootRouter;
