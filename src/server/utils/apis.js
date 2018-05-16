import axios from 'axios'

import { usersGithub } from 'config/urls'

export {
  getUserDetails : function (username) {
    return axios.get(`${usersGithub}/${username}`)
  }
}
