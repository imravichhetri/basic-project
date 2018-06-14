import React from 'react'
const FavIcon = 'abc.png'
export default class Html extends React.Component {
  render () {
    return (
      <html
        lang='en'
        style={{
          height: '100%',
          width: '100%'
        }}
      >
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='shortcut icon' type='image/x-icon' href={FavIcon} />
          <link rel='icon' type='image/x-icon' href={FavIcon} />
          <link rel='stylesheet' type='text/css' href='/statics/css/index.css' />
          <script src='https://apis.google.com/js/client:platform.js' />

          <title>Reco Dashboard</title>
        </head>
        <body
          style={{
            height: '100%',
            width: '100%',
            margin: 0,
            fontSize: '0.8rem',
            backgroundColor: '#e8e7e7',
            color: '#6a6a6a'
          }}
        >
          <div
            id='content'
            style={{
              height: '100%',
              width: '100%'
            }}
          >
            { this.props.children }
          </div>
          <script
            dangerouslySetInnerHTML={{ __html: `window.__APOLLO_STATE__=${JSON.stringify(this.props.state)};` }}
            charSet='UTF-8'
          />
          <script src='/statics/bundle.js' charSet='UTF-8' />
        </body>
      </html>
    )
  }
}
