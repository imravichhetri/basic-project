import { sortBy as _sort, each as _each } from 'lodash'
import * as allRoutes from './routes';

import {
  printAndReturn
} from './services/test';

const value = printAndReturn( 1 );
console.log( value,'======value' );
console.log(allRoutes, 'allRoutes')
const init = async( app: any ) => {
  /*_each(
    _sort(allRoutes, ({ route, url }) => url).reverse(),
    ({ route, url }) => {
      if (url) {
        app.use(url, route)
      } else {
        app.use(route)
      }
    }
  )*/
}

export default init;