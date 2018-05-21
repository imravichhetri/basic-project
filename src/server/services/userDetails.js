import {getUserDetails} from '../utils/apis'
export const userData = async (req, res, next) => {
  const {data} = await getUserDetails(req.params.username)
  res.status(200).send({data})
}
