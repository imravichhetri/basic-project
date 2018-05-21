import Express from 'express'

import init from './init'

const app = new Express()
const PORT = 4000

init(app).then((data) => {
  app.listen(PORT, () => {
    console.log(`App running in ${PORT}`)
  })
})
  .catch(e => {
    console.log('Error occurred', e)
  })
