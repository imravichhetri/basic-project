import { Resolver } from 'graphql-compose'
import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import { GithubOutputSchema } from '../../schemas/Github'
import { getGithubUserDetails } from '../../../services/github'
export const Users = new Resolver({
  name: 'Github',
  type: GithubOutputSchema,
  args: {
    username: new GraphQLNonNull(GraphQLString)
  },
  resolve: async ({ source, args }) => {
    const data = await getGithubUserDetails(args.username)
    return data
  }
})
