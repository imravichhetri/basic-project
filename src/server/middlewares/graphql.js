import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'

import schema from '../graphql'
export const giqlExpress = graphiqlExpress({ endpointURL: '/graphql' })
export const gqlExpress = graphqlExpress((req, res) => {
  return {
    schema,
    context: {
      reqType: req.headers['auth-type'],
      expressReq: req,
      expressRes: res,
      user: req['auth-user'],
      // authToken: req.cookies.auth,
      session: req.session
    }
  }
})
