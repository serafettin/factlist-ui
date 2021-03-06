import React from 'react'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { getToken } from 'utils/storage'

// Scenes
import Main from 'scenes/Main'
import SignOut from 'scenes/SignOut'
import NotFound from 'scenes/NotFound'
import Settings from 'scenes/Settings'
import ChangePassword from 'scenes/ChangePassword'
import TwitterCallback from 'scenes/TwitterCallback'
import Profile from 'scenes/Profile'
import NewTopicPage from 'containers/Topic/New'

export default ({ history }) => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Main} />
      <PrivateRoute path="/sign_out" component={SignOut} />
      <PrivateRoute path="/settings" component={Settings} />
      <Route path="/change_password/:key" component={ChangePassword} />
      <Route path="/twitter/callback/:token" component={TwitterCallback} />
      <Route path="/@:username" component={Profile} />
      <Route path="/topic/new" component={NewTopicPage} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    getToken()
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )} />
)
