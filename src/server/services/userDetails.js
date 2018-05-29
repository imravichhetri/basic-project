import {getUserDetails} from '../utils/apis'
export const userData = async (req, res, next) => {
  try {
    const {data} = await getUserDetails(req.params.username)
    res.status(200).send({data})
  } catch (e) {
    res.status(500).send({ error: e.response })
  }
}
