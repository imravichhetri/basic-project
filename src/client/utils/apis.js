import axios from 'axios'

import {githubUserUrl} from './urls'

export const getUserData = async (username) => {
  console.log(`${githubUserUrl}/${username}`, 'uirl')
  const {data} = await axios.get(`${githubUserUrl}/${username}`)
  return data
}
