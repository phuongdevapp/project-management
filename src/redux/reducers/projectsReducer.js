import {
  PROJECTS_CATEGORIES_GETLIST_REQUEST,
  PROJECTS_CATEGORIES_GETLIST_SUCCESS,
  PROJECTS_CATEGORIES_GETLIST_FAILURE,
  PROJECTS_GETLIST_REQUEST,
  PROJECTS_GETLIST_SUCCESS,
  PROJECTS_GETLIST_FAILURE,
  PROJECTS_GETLIST_REFRESHING,
  PROJECTS_GETLIST_RESET_BY_KEY
} from '../actionType';

const INITIAL_STATE = {
  initList: true,
  isLoading: false,
  emptyData: false,
  projectsData: [],
  isRefreshing: false,
  PROJECTS_LOAD_ERROR: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECTS_GETLIST_RESET_BY_KEY: {
      if (action.payload.key === 'state') {
        return INITIAL_STATE;
      }
      const newValues = state[action.payload.key];
      return {
        ...state,
        [action.payload.key]: action.payload.path && !_.isEmpty(action.payload.path) ? _.set(newValues, action.payload.path, action.payload.value) : action.payload.value
      };
    }
    case PROJECTS_GETLIST_REQUEST: {
      return { 
        ...state, 
        isLoading: true,
        PROJECTS_LOAD_ERROR: INITIAL_STATE.PROJECTS_LOAD_ERROR
      };
    }
    case PROJECTS_GETLIST_SUCCESS: {
      return {
        ...state,
        initList: false,
        isLoading: false,
        isRefreshing: false,
        projectsData: action.payload,
        PROJECTS_LOAD_ERROR: { hasError: false, status: action.payload.status }
      };
    }
    case PROJECTS_GETLIST_FAILURE: {
      return {
        ...state,
        initList: false,
        isLoading: false,
        isRefreshing: false,
        PROJECTS_LOAD_ERROR: { hasError: true, status: action.payload.status }
      };
    }
    case PROJECTS_GETLIST_REFRESHING: {
      return {
        ...state,
        isRefreshing: true,
        projectsData: INITIAL_STATE.projectsData
      };
    }
    default:
      return state;
  }
};