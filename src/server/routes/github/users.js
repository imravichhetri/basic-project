import {Router as router} from 'express'

import {userData} from '../../services/userDetails'

const Router = router()

Router.get('/:username', userData)

export const url = '/users'
export const route = Router
