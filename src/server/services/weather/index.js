import { getWeatherDetails, getGeoCode } from '../../utils/apis'

export const getWeatherDetailByAddress = async (req, res, next) => {
  try {
    const { data } = await getGeoCode(req.params.address)
    // data.results.geometry.location
    const weatherResponse = (await getWeatherDetails(
      data.results[0].geometry.location.lat,
      data.results[0].geometry.location.lng
    )).data
    return res.status(200).send({
      current: {
        temperature: weatherResponse.currently.temperature,
        humidity: weatherResponse.currently.humidity,
        pressure: weatherResponse.currently.pressure
      }
    })
  } catch (e) {
    res.status(500).send({ error: 'something blew up' })
  }
}
