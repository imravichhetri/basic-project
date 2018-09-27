import { Router as router } from "express";
import { gqlExpress } from "../middlewares/graphql";

const Router = router();

Router.use( gqlExpress );

export const url = "/graphql";
export const route = Router;
