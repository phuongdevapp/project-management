import {
  EMPLOYEES_GETLIST_REQUEST,
  EMPLOYEES_GETLIST_SUCCESS,
  EMPLOYEES_GETLIST_FAILURE,
  EMPLOYEES_GETLIST_REFRESHING
} from '../actionType';

const INITIAL_STATE = {
  initList: true,
  isLoading: false,
  emptyData: false,
  employeesData: [],
  isRefreshing: false,
  EMPLOYEES_LOAD_ERROR: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_GETLIST_REQUEST: {
      return { 
        ...state, 
        isLoading: true,
        emptyData: false,
        EMPLOYEES_LOAD_ERROR: INITIAL_STATE.EMPLOYEES_LOAD_ERROR
      };
    }
    case EMPLOYEES_GETLIST_SUCCESS: {
      return {
        ...state,
        initList: false,
        isLoading: false,
        isRefreshing: false,
        employeesData: action.payload,
        EMPLOYEES_LOAD_ERROR: { hasError: false, status: action.payload.status }
      };
    }
    case EMPLOYEES_GETLIST_FAILURE: {
      return {
        ...state,
        initList: false,
        isLoading: false,
        isRefreshing: false,
        EMPLOYEES_LOAD_ERROR: { hasError: true, status: action.payload.status }
      };
    }
    case EMPLOYEES_GETLIST_REFRESHING: {
      return {
        ...state,
        isRefreshing: true,
        employeesData: INITIAL_STATE.employeesData
      };
    }
    default:
      return state;
  }
};