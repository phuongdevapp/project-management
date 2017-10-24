import { NETINFO_SET_ISCONNECTED } from '../actionType';

export const setIsConnected = isConnected => ({
  type: NETINFO_SET_ISCONNECTED, payload: isConnected
})