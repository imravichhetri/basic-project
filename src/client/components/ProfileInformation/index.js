import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isEqual as _isEqual } from "lodash";
import { sendUsername } from "../../redux/actions/github";
import ProgressBar, { LoadingContainer } from "../Loading";
import "./styles.css";

/*const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ sendUsername }, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)*/
export default class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isLoading: this.props.isLoading || false,
      username: this.props.dashboardReducers.textValue || this.props.match.params.username
    }
  }

  componentDidMount() {
    console.log(this.props, "componentDidMount");
    this.props.actions.sendUsername(this.props.match.params.username);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(this.props, nextProps);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.dashboardReducers.textValue !== prevProps.dashboardReducers.textValue
    ) {
      this.props.actions.sendUsername(this.props.dashboardReducers.textValue)
    }
  }

  _githubStatCard = ({ label, stat }) => (
    <div className="github-stat-card">
      <div>{stat}</div>
      <div>{label}</div>
    </div>
  );
  _profileCard = () => (
    <div>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" src="" /> //{//this.props.githubReducers.avatarUrl}/>
        }
        title={this.props.githubReducers.username}
        subheader={this.props.githubReducers.htmlUrl}
      />
      <CardContent className="card-content">
        <Grid container>
          <Grid item xs={3} md={3} />
          <Grid item xs={2} md={2}>
            {this._githubStatCard({
              label: "Repos",
              stat: this.props.githubReducers.publicRepos
            })}
          </Grid>
          <Grid item xs={2} md={2}>
            {this._githubStatCard({
              label: "Following",
              stat: this.props.githubReducers.following
            })}
          </Grid>
          <Grid item xs={2} md={2}>
            {this._githubStatCard({
              label: "Followers",
              stat: this.props.githubReducers.followers
            })}
          </Grid>
          <Grid item xs={3} md={3} />
        </Grid>
      </CardContent>
    </div>
  );
  render() {
    if (
      this.props.dashboardReducers.isLoading !== 0 &&
      typeof ProgressBar.showLoader === "function"
    ) {
       ProgressBar.showLoader();
    }
    if (
      this.props.dashboardReducers.isLoading === 0 &&
      typeof ProgressBar.showLoader === "function"
    ) {
       ProgressBar.hideLoader();
    }
    console.log(this.props,'ProfileCard Props')
    return (
      <Card className="card-container" raised>
        <Grid container>
          <Grid item xs={10} md={5}>
            {this.state.username && this._profileCard()}
          </Grid>
          <Grid item md={2} />
          <Grid item xs={10} md={5}>
            {this._profileCard()}
          </Grid>
        </Grid>
      </Card>
    );
  }
}
