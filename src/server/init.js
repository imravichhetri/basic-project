import { sortBy as _sort, each as _each } from 'lodash'
import allRoutes from './routes/*'

const init = async app => {
  _each(
    _sort(allRoutes, ({ route, url }) => url).reverse(),
    ({ route, url }) => {
      if (url) {
        app.use(url, route)
      } else {
        app.use(route)
      }
    }
  )
}

export default init
