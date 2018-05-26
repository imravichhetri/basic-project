import {Router as router} from 'express'

import {getWeatherDetailByAddress} from '../../services/weather'
console.log(getWeatherDetailByAddress, 'getWeatherDetailByAddress')
const Router = router()

Router.get('/:location', getWeatherDetailByAddress)

export const url = '/location'
export const route = Router
