import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../../navigators/AppNavigator';
import { LOGIN_SUCCESS, LOGOUT } from '../actionType';

const initialNavState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('login')
);


export default (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    case LOGIN_SUCCESS:
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'main' }),
      state
    );
      break;
    case LOGOUT:{
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'login'})
        ]
      });
      nextState = AppNavigator.router.getStateForAction(
        resetAction,
        state
      );
    }
    

      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}
