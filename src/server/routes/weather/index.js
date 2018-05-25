import { Router as router } from 'express'
import allWeatherRoutes from './*'
import { each as _each, sortBy as _sort } from 'lodash'

const Router = router()

_each(
  _sort(allWeatherRoutes, ({ route, url }) => url).reverse(),
  ({ route, url }) => {
    if (url) {
      Router.use(url, route)
    } else if (route !== undefined) {
      Router.use(route)
    }
  }
)
export const url = '/weather'
export const route = Router
