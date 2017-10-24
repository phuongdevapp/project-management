import _ from 'lodash';
import {
  PROJECTS_DETAIL_GET_DATA_REQUEST,
  PROJECTS_DETAIL_GET_DATA_SUCCESS,
  PROJECTS_DETAIL_GET_DATA_FAILURE,
  PROJECTS_DETAIL_RESET_BY_KEY,
  PROJECTS_DETAIL_GET_ACCOUNT_SUCCESS,
  PROJECTS_DETAIL_UPDATE_STATUS_ACCOUNT_SUCCESS
} from '../actionType';

const INITIAL_STATE = {
  initComponent: true,
  isLoading: false,
  isRefreshing: false,
  detail: null,
  DETAIL_PROJECT_ERROR: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECTS_DETAIL_RESET_BY_KEY: {
      if (action.payload.key === 'state') {
        return INITIAL_STATE;
      }
      const newValues = state[action.payload.key];
      return {
        ...state,
        [action.payload.key]: action.payload.path && !_.isEmpty(action.payload.path) ? _.set(newValues, action.payload.path, action.payload.value) : action.payload.value
      };
    }
    case PROJECTS_DETAIL_GET_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        DETAIL_PROJECT_ERROR: INITIAL_STATE.DETAIL_PROJECT_ERROR
      };
    case PROJECTS_DETAIL_GET_DATA_FAILURE:
      return {
        ...state,
        initComponent: false,
        isLoading: false,
        isRefreshing: false,
        DETAIL_PROJECT_ERROR: { hasError: true, status: action.payload.status }
      };
    case PROJECTS_DETAIL_GET_DATA_SUCCESS: {
      return {
        ...state,
        initComponent: false,
        isLoading: false,
        isRefreshing: false,
        detail: action.payload.data,
        DETAIL_PROJECT_ERROR: { hasError: false, status: action.payload.status }
      };
    }
    case PROJECTS_DETAIL_GET_ACCOUNT_SUCCESS: {
      return {
        ...state,
        detail: { ...state.detail, Username: action.payload.Username, Password: action.payload.Password }
      }
    }
    case PROJECTS_DETAIL_UPDATE_STATUS_ACCOUNT_SUCCESS: {
      return {
        ...state.detail,
        detail: { ...state.detail, Status: action.payload }
      }
    }
    default:
      return state;
  }
};