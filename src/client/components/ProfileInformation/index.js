import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Grid from "@material-ui/core/Grid";
import {connect } from 'react-redux'

import './styles.css'

class ProfileCard extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {

  }

  _profileCard =()=>(
      <div>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe">
                R
              </Avatar>
            }
            title={this.props.store.username}
            subheader="September 14, 2016"
          />
          <CardContent className='card-content'>
            <Typography component='p'>
              This impressive paella is a perfect party dish and a fun meal to cook together with
              your guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
          </CardContent>
        </div>
    )
  render () {
    console.log(this.props,'profile Information')
    return (
      <Card className='card-container' raised>
        <Grid container>
          <Grid item xs={10} md ={5}>
            {this._profileCard()}
          </Grid>
          <Grid item md={2}/>
          <Grid item xs={10} md ={5}>
            {this._profileCard()}
          </Grid>
        </Grid>
      </Card>
    )
  }
}

const mapStateToProps=state=>(state)
export default connect(mapStateToProps)(ProfileCard)