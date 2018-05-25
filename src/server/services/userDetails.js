import {getUserDetails} from '../utils/apis'
export const userData = async (req, res, next) => {
  try {
    const {data} = await getUserDetails(req.params.username)
    console.log(data, 'data')
    res.status(200).send({data})
  } catch (e) {
    console.log(e.response, 'error')
    res.status(500).send({ error: 'something blew up' })
  }
}
