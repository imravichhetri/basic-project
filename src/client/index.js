/*import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider, Query } from 'react-apollo'
// import gql from 'graphql-tag'

import client from './apollo'
// const Tag = () => (<div>Done</div>)
class App extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    console.log(this.props, 'this.props')
    return <Query query={
    		gql`{Github(username:"imravichhetri"){
    name
    username
    avatarUrl
    followers
    following
    repos
  }}`
    	}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error :(</p>
        	console.log(data, 'data')
        return <h1>{datApolloProvidera.Github.username}</h1>
      }}
    </Query>
  }
}

render(
  <ApolloProvider client={client}>
    <div>Heyo
    </div>
  </ApolloProvider>,
  document.getElementById('content')
)
*/