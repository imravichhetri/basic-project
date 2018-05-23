import {Router as router} from 'express'
import githubRouter from './github'

const Router = router()
Router.use('/github', githubRouter)

export const url = '/apis'
export const route = Router
