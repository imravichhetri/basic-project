import { Router as router } from 'express'

import {
  msGzipHeaders,
  mwStaticsClient,
  mwStatics
} from '../middlewares/statics'

const Router = router()

Router.use(msGzipHeaders)
Router.use(mwStatics)
if (mwStaticsClient) {
  Router.use(mwStaticsClient)
}

export const url = '/statics'
export const route = Router
