import axios from 'axios';
import {
  PROJECTS_GETLIST_REQUEST,
  PROJECTS_GETLIST_SUCCESS,
  PROJECTS_GETLIST_FAILURE,
  PROJECTS_GETLIST_REFRESHING,
  PROJECTS_GETLIST_RESET_BY_KEY
} from '../actionType';

import { ROOT_URL } from '../../services/commonService';

export const refreshDataHandle = () => ({
  type: PROJECTS_GETLIST_REFRESHING
});
export const resetStateByKey = ({ key, path, value }) => ({
  type: PROJECTS_GETLIST_RESET_BY_KEY,
  payload: { key, path, value }
});

export const loadDataHandle = ({ access_token, cateId, keyword }) => async (dispatch) => {
  dispatch({ type: PROJECTS_GETLIST_REQUEST })
  try {
    let response = await axios.get(`${ROOT_URL}/api/Project/GetAll`, {
      headers: {
        'Authorization': `bearer ${access_token}`
      },
      params: {
        cateId,
        keyword
      }
    });
    if (response) {
      if (response.status === 200) {
        console.log(response.data)
        dispatch({ type: PROJECTS_GETLIST_SUCCESS, payload: response.data })
      }
      else {
        dispatch({ type: PROJECTS_GETLIST_FAILURE });
      }
    }
  } catch (error) {
    if (error.response) {
      dispatch({
        type: PROJECTS_GETLIST_FAILURE,
        payload: {
          data: error.response.data,
          status: error.response.status,
          statusText: error.response.headers
        }
      });
    } else if (error.request) {
      dispatch({
        type: PROJECTS_GETLIST_FAILURE,
        payload: {
          data: null,
          status: 600,
          statusText: null
        }
      });
    } else {
      dispatch({
        type: PROJECTS_GETLIST_FAILURE,
        payload: {
          data: null,
          status: -99,
          statusText: error.message
        }
      });
    }
    console.log(error);
  }
}