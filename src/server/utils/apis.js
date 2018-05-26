import axios from 'axios'

import {
  usersGithubUrl,
  geocodeUrl,
  weatherUrl} from '../config/urls'

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
  // return axiosInstance.get(`${usersGithubUrl}/${username}`)
  return axiosInstance.get('http://localhost:3000/github')
}
const getGeoCode = function (address) {
  // return axiosInstance.get(`${geocodeUrl}/${address}`)
  return axiosInstance.get('http://localhost:3000/geoLocation')
}
const getWeatherDetails = function (longitude, latitude) {
  // return axiosInstance.get(`${weatherUrl}/${latitude },${longitude}`)
  return axiosInstance.get('http://localhost:3000/weather')
}
export {
  getUserDetails,
  getGeoCode,
  getWeatherDetails
}
