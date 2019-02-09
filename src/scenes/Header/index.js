import React from 'react'
import { connect } from 'react-redux'
import HeaderComponent from 'components/Header'
import {
  showSignInModal,
} from 'modules/modal/actions'

import config from 'config';

const Header = ({
  authenticating,
  user,
  token,
  hideSignInButton,
  showSignInModal,
  onClickNewTopic,
}) => {
  console.log(config.API_ENDPOINT, "process.env.REACT_APP_API_ENDPOINT")
  console.log(authenticating, "authenticating")
  return (
    <HeaderComponent
      user={user}
      token={token}
      authenticating={authenticating}
      onClickSignInButton={showSignInModal}
      hideSignInButton={hideSignInButton} />
  )
}

const mapStateToProps = state => ({
  authenticating: state.auth.authenticating,
  user: state.auth.user,
  token: state.auth.token,
})

const mapDispatchToProps = (dispatch) => ({
  showSignInModal: () => dispatch(showSignInModal()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
