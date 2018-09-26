import { GQC } from 'graphql-compose'
import { forEach as _forEach } from 'lodash'
import Queries from './*/index.js'
const initializeQueries = () => {
  try {
    const resolvers = {}
    Queries.forEach(schemaResolvers => {
      _forEach(schemaResolvers, (schemaResolver, key) => {
        // console.log(schemaResolver, 'schemaResolver')
        resolvers[schemaResolver.name] = schemaResolver
      })
    })
    GQC.rootQuery().addFields(resolvers)
  } catch (e) {
    console.log(e, 'error')
  }
}
export default initializeQueries
