import React from 'react'
import ReactDOM from 'react-dom/server'

import Html from '../../universal/Html'
import SplashScreen from '../../universal/SplashScreen'

let _jsFileUrl = ''// '/statics/bundle.js'
export const defaultResponse = (req, res) => {
  // if (req.headers['accept-encoding'].search('gzip') !== -1) {
  //   _jsFileUrl = '/statics/bundle.js.gz'
  // } else {
  //   _jsFileUrl = '/statics/bundle.js'
  // }
  const html = (
    <Html>
      <SplashScreen />
    </Html>
  )
  res.status(200)
  res.send(`<!doctype html>${ReactDOM.renderToString(html)}`)
  res.end()
}
