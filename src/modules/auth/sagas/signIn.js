import { put } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import config from 'config'
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import { push as redirect } from 'react-router-redux'
import { saveToken } from 'utils/storage'
import formatFormErrors from 'utils/formatFormErrors'
import { signInSuccess, signInFailure } from '../actions'
import { SIGN_IN_FORM_NAME } from '../constants'
// import GET_USER from '../../../graphql/queries/user';
// import client from '../../../graphql';

const signIn = function* ({ email, password }) {
  try {
    yield put(startSubmit(SIGN_IN_FORM_NAME))

    // Token request with email & password
    const response = yield axios
      .post(`${config.API_ENDPOINT}/auth/login/`, { email, password })

    const token = response.data.token
    const id = jwtDecode(token).sub;
    // const user = getUserInfo({id}).then((res) => res);
    yield put(signInSuccess({
      token,
      user: response.data,
    }))

    // Store user's token in local storage to keep user authenticated
    saveToken(token)

    yield put(redirect('/'))
  } catch (error) {
    let errors = formatFormErrors(error.response.data)

    yield put(stopSubmit(SIGN_IN_FORM_NAME, errors))

    yield put(signInFailure(error))
  }
}

export default signIn
