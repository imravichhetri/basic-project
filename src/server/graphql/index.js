import {GQC } from 'graphql-compose'
import initializeQueries from './queries'
import initializeMutations from './mutations'

initializeQueries()
initializeMutations()

export default GQC.buildSchema()
