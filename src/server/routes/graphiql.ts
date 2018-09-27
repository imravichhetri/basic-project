import { Router as router } from "express";
import { giqlExpress } from "../middlewares/graphql";

const Router = router();
Router.use( giqlExpress );
export const url = "/graphiql";
export const route = Router;
