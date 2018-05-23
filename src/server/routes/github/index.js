import { Router as router } from 'express'
import allGithubRoutes from './*'
import { each as _each, sortBy as _sort } from 'lodash'

const Router = router()

_each(
  _sort(allGithubRoutes, ({ route, url }) => url).reverse(),
  ({ route, url }) => {
    if (url) {
      Router.use(url, route)
    } else if (route !== undefined) {
      Router.use(route)
    }
  }
)
export default Router
