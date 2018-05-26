import { sortBy as _sort, each as _each } from 'lodash'
import allRoutes from './routes/*.js'

console.log(allRoutes, 'allRoutes')
const init = async app => {
  _each(
    _sort(allRoutes, ({ route, url }) => url).reverse(),
    ({ route, url }) => {
      if (url) {
        app.use(url, route)
      } else if (route !== undefined) {
        app.use(route)
      }
    }
  )
}

export default init
