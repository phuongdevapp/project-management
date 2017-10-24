import {
NETINFO_SET_ISCONNECTED
} from '../actionType';

const INITIAL_STATE = {
  isConnected: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NETINFO_SET_ISCONNECTED: {
      return { ...state, isConnected: action.payload };
    }
    default:
      return state;
  }
};