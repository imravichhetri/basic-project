import {Router as router} from 'express'

import {userData} from '../../services/userDetails'

const Router = router()

Router.get('/:location', userData)

export const url = '/location'
export const route = Router
