import { Router as router } from 'express'

import {
  mwJsGzOptimization,
  msGzipHeaders,
  mwStaticsClient,
  mwStatics
} from '../middlewares/statics'

const Router = router()

Router.use(mwJsGzOptimization)
Router.use(msGzipHeaders)
Router.use(mwStatics)
if (mwStaticsClient) {
  Router.use(mwStaticsClient)
}

export const url = '/statics'
export const route = Router
