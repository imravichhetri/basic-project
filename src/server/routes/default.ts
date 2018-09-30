import { Router as router } from "express";

import { MwDefault } from "../middlewares/default";

const Router = router();
Router.use( MwDefault );
export const url = "";
export const route = Router;