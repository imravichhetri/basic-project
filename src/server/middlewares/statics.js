import Express from 'express'
import Proxy from 'http-proxy-middleware'
import Path from 'path'

let mwStaticsClient

if (process.env.NODE_ENV === 'development') {
  mwStaticsClient = Proxy({ target: 'http://localhost:4001', pathRewrite: { '^/statics': '' } })
}
const mwStatics = Express.static(
  Path.join(process.cwd(), '/build/client')
)

const msGzipHeaders = (req, res, next) => {
  if ((/.gz$/).test(req.originalUrl)) {
    res.set('Content-Encoding', 'gzip')
    res.set('Content-Type', 'text/event-stream')
  }
  next()
}

export {
  msGzipHeaders,
  mwStaticsClient,
  mwStatics
}
