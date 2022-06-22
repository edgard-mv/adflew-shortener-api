import express from "express";

const linksRouter = express.Router();

linksRouter.get("/", (_, res) => {
  res.status(200).send({ data: { message: "routes setup" } });
});

export default linksRouter;
