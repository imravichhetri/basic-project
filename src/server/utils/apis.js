import axios from 'axios'

import { usersGithub } from '../config/urls'

const getUserDetails = function (username) {
  return axios.get(`${usersGithub}/${username}`)
}
export {
  getUserDetails
}
