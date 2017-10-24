import { ToastAndroid, Clipboard } from 'react-native';
import axios from 'axios';
import {
  PROJECTS_DETAIL_GET_DATA_REQUEST,
  PROJECTS_DETAIL_GET_DATA_SUCCESS,
  PROJECTS_DETAIL_GET_DATA_FAILURE,
  PROJECTS_DETAIL_RESET_BY_KEY,
  PROJECTS_DETAIL_GET_ACCOUNT_REQUEST,
  PROJECTS_DETAIL_GET_ACCOUNT_SUCCESS,
  PROJECTS_DETAIL_GET_ACCOUNT_FAILURE,
  PROJECTS_DETAIL_UPDATE_STATUS_ACCOUNT_REQUEST,
  PROJECTS_DETAIL_UPDATE_STATUS_ACCOUNT_SUCCESS,
  PROJECTS_DETAIL_UPDATE_STATUS_ACCOUNT_FAILURE
} from '../actionType';

import { ROOT_URL } from '../../services/commonService';

export const resetStateByKey = ({ key, path, value }) => ({
  type: PROJECTS_DETAIL_RESET_BY_KEY,
  payload: { key, path, value }
});

export const getDetailHandle = ({ access_token, projectId }) => async (dispatch) => {
  dispatch({ type: PROJECTS_DETAIL_GET_DATA_REQUEST });
  try {
    const response = await axios.get(`${ROOT_URL}/api/Project/Get`,
      {
        headers: {
          Authorization: `bearer ${access_token}`
        },
        params: {
          id: projectId
        }
      });
    console.log(response);
    if (response) {
      if (response.status === 200) {
        dispatch({
          type: PROJECTS_DETAIL_GET_DATA_SUCCESS,
          payload: {
            data: response.data
          }
        });
      }
    }
  } catch (error) {
    console.log(error)
  }
};

export const getAccount = ({ access_token, projectId }) => async (dispatch) => {
  dispatch({ type: PROJECTS_DETAIL_GET_ACCOUNT_REQUEST })
  try {
    const response = await axios.get(`${ROOT_URL}/api/Project/GetAccount`,
      {
        headers: {
          Authorization: `bearer ${access_token}`,
        },
        params: {
          id: projectId
        }
      });
    if (response) {
      console.log(response.status);
      if (response.status == 200) {
        console.log(response.data);
        if (response.data !== null) {
          dispatch({ type: PROJECTS_DETAIL_GET_ACCOUNT_SUCCESS, payload: response.data });
          await Clipboard.setString('User: ' + response.data.Username + '\nPass: ' + response.data.Password);
          ToastAndroid.show('Get Account Thành công', ToastAndroid.SHORT)
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export const updateStatusAccount = ({ access_token, projectId, verifyKey, status }) => async (dispatch) => {
  dispatch({ type: PROJECTS_DETAIL_UPDATE_STATUS_ACCOUNT_REQUEST });
  console.log('input', { access_token, projectId, verifyKey, status });
  try {
    const response = await axios.post(`${ROOT_URL}/api/Project/UpdateStatus`, { id: projectId, key: verifyKey, status },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `bearer ${access_token}`,
        }
      });
    if (response) {
      console.log(response);
      if (response.status == 200) {
        dispatch({ type: PROJECTS_DETAIL_UPDATE_STATUS_ACCOUNT_SUCCESS, payload: status });
      }
    }
  } catch (error) {
    console.log(error);
    ToastAndroid.show(error.response.data.Message, ToastAndroid.LONG);
  }
}
