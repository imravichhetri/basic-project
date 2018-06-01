import {GQC } from 'graphql-compose'
import initializeQueries from './queries'

initializeQueries()

export default GQC.buildSchema()
