import {Router as router} from 'express'
import { each as _each, sortBy as _sort } from 'lodash'

import allApiRoutes from './*/'
import githubRouter from './github'

const Router = router()

_each(
  _sort(allApiRoutes, ({ route, url }) => url).reverse(),
  ({ route, url }) => {
    if (url) {
      Router.use(url, route)
    } else if (route !== undefined) {
      Router.use(route)
    }
  }
)

export const url = '/apis'
export const route = Router
