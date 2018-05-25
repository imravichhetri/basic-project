import axios from 'axios'

import { usersGithub } from '../config/urls'

var axiosInstance = axios.create({
  timeout: 1000 * 60 * 30,
  headers: {
    Accept: 'application/json, text/plain',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
axiosInstance.defaults.timeout = 1000 * 60 * 30
/* const config = {
  headers: {
    Accept: 'application/json, text/plain, ',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
} */

const getUserDetails = function (username) {
  // return axiosInstance.get(`${usersGithub}/${username}`)
  return axiosInstance.get('http://localhost:3000/data')
}
export {
  getUserDetails
}
