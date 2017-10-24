import axios from 'axios';
import {
  EMPLOYEES_GETLIST_REQUEST,
  EMPLOYEES_GETLIST_SUCCESS,
  EMPLOYEES_GETLIST_FAILURE,
  EMPLOYEES_GETLIST_REFRESHING
} from '../actionType';

import { ROOT_URL } from '../../services/commonService';

export const refreshDataHandle = () => ({
  type: EMPLOYEES_GETLIST_REFRESHING
});

export const loadDataHandle = access_token => async (dispatch) => {
  dispatch({ type: EMPLOYEES_GETLIST_REQUEST })
  try {
    let response = await axios.get(`${ROOT_URL}/api/Account/GetList`, {
      headers: {
        'Authorization': `bearer ${access_token}`
      }
    });
    if (response) {
      if (response.status === 200) {
        console.log(response.data)
        dispatch({ type: EMPLOYEES_GETLIST_SUCCESS, payload: response.data })
      }
    }

  } catch (error) {
    console.log(error);
    if (error.response) {
      dispatch({
        type: EMPLOYEES_GETLIST_FAILURE,
        payload: {
          data: error.response.data,
          status: error.response.status,
          statusText: error.response.headers
        }
      });
    } else if (error.request) {
      dispatch({
        type: EMPLOYEES_GETLIST_FAILURE,
        payload: {
          data: null,
          status: 600,
          statusText: null
        }
      });
    } else {
      dispatch({
        type: EMPLOYEES_GETLIST_FAILURE,
        payload: {
          data: null,
          status: -99,
          statusText: error.message
        }
      });
    }
  }
}