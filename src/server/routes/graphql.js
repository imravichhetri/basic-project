import {Router as router} from 'express'
import bodyParser from 'body-parser'
import {gqlExpress} from '../middlewares/graphql'

const Router = router()

Router.use(bodyParser.json())
Router.use(gqlExpress)
export const url = '/graphql'
export const route = Router
