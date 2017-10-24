import React from 'react';
import { BackHandler, Alert, NetInfo, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import {
  addNavigationHelpers,
  StackNavigator,
  NavigationActions
} from 'react-navigation';
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import { setIsConnected } from '../redux/actions/netAction';


export const AppNavigator = StackNavigator({
  // flash: {
  //   screen: FlashScreen
  // },
  login: {
    screen: LoginScreen
  },
  main: {
    screen: MainScreen
  }
},
  {
    headerMode: 'none',
    navigationOptions: { gesturesEnabled: false }
  });

class AppWithNavigationState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backPress: false
    };
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    //Back 2 lần để thoát
    var _this = this;
    if (!this.state.backPress) {
      ToastAndroid.show('Nhấn back lần nữa để thoát', ToastAndroid.SHORT);
      this.setState({ backPress: true });
      setTimeout(function () {
        _this.setState({ backPress: false });
      }, 2500);
    } else {
      return false;
    }
    return true;
  //   //Confirm khi backandroid
  //   // const { dispatch, nav } = this.props;
  //   // if (nav.index >= 0 && (nav.routes[nav.index].routeName === 'main' || nav.routes[nav.index].routeName === 'login')) {
  //   //   Alert.alert('Xác nhận', 'Bạn có muốn thoát ứng dụng?', [
  //   //     { text: 'HUỶ', onPress: () => undefined },
  //   //     { text: 'OK', onPress: () => BackHandler.exitApp() }
  //   //   ]);
  //   //   return true;
  //   // }
  //   // return true;
   };
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.nav })} />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

const mapActionToState = {
  setIsConnected
};

export default connect(mapStateToProps, mapActionToState)(AppWithNavigationState);
