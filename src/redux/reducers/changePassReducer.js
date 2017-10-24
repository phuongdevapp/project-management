import {
  ACCOUNT_CHANGE_PASSWORD_REQUEST,
  ACCOUNT_CHANGE_PASSWORD_FAILURE,
  ACCOUNT_CHANGE_PASSWORD_SUCCESS
} from '../actionType';

const INITIAL_STATE = {
  isLoading: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACCOUNT_CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ACCOUNT_CHANGE_PASSWORD_SUCCESS: {
      return { ...state, isLoading: false }
    }
    case ACCOUNT_CHANGE_PASSWORD_FAILURE: {
      return { ...state, isLoading: false }
    }
    default:
      return state;
  }
};