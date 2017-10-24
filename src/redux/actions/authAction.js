import axios from 'axios';
import { ToastAndroid, Alert } from 'react-native';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  ACCOUNT_CHANGE_PASSWORD_REQUEST,
  ACCOUNT_CHANGE_PASSWORD_SUCCESS,
  ACCOUNT_CHANGE_PASSWORD_FAILURE

} from '../actionType';

import { ROOT_URL } from '../../services/commonService';

export const loginHandle = ({ username, password }) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(`${ROOT_URL}/token`,
      'grant_type=password'
      + `&username=${username}`
      + `&password=${password}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    console.log(response);
    if (response) {
      if (response.status === 200) {
        dispatch({ type: LOGIN_SUCCESS, payload: response.data })
        console.log(response.data.access_token);
      }
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE });
    Alert.alert('Thông báo', 'Tên đăng nhập hoặc mật khẩu không đúng!\nVui lòng thử lại');
    console.log(error);
  }
}

export const logoutHandle = access_token => async (dispatch) => {
  try {
    const response = await axios.post(`${ROOT_URL}/api/Account/Logout`, {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `bearer ${access_token}`,
        }
      });
    console.log(response);
    if (response) {
      if (response.status === 200) {
        dispatch({ type: LOGOUT })
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export const changePassHandle = ({ access_token, password, confirmPassword }) => async (dispatch) => {
  dispatch({ type: ACCOUNT_CHANGE_PASSWORD_REQUEST });
  try {
    const response = await axios.post(`${ROOT_URL}/api/Account/ChangePassword`,
      `Password=${password}`
      + `&ConfirmPassword=${confirmPassword}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `bearer ${access_token}`,
        }
      }
    );
    if (response) {
      if (response.status === 200) {
        dispatch({ type: ACCOUNT_CHANGE_PASSWORD_SUCCESS })
        dispatch({ type: LOGOUT })
        ToastAndroid.show('Đổi mật khẩu thành công.! \nVui lòng đăng nhập lại', ToastAndroid.SHORT)
      }
    }
  } catch (error) {
    dispatch({ type: ACCOUNT_CHANGE_PASSWORD_FAILURE });
    alert(error.response.data.ModelState);
    console.log(error.response.data.ModelState);
  }
}