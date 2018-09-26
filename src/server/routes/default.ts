import { Router as router } from 'express'

import {
  defaultResponse
} from '../middlewares/default'

const Router = router()

Router.use(defaultResponse)

export const url = ''
export const route = Router