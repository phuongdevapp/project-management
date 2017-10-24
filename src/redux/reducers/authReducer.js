import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ACCOUNT_CHANGE_PASSWORD_REQUEST,
  ACCOUNT_CHANGE_PASSWORD_FAILURE,
  ACCOUNT_CHANGE_PASSWORD_SUCCESS
} from '../actionType';

const INITIAL_STATE = {
  account: null,
  isLoading: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, isLoading: true, error: '' };
    }
    case LOGIN_SUCCESS: {
      return { ...state, isLoading: false, account: action.payload }
    }
    case LOGIN_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};