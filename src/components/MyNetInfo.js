import React from 'react';
import {
  View,
  Text,
  NetInfo,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import { setIsConnected } from '../redux/actions/netAction';

import { Screen, Color } from '../constants/Styles';
class MyNetInfo extends React.Component {

  constructor(props) {
    super(props)
    props.isList = false
    this.state = { isConnected: true }
    NetInfo.isConnected.fetch().then(this.checkConnection) // For first connect
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.checkConnection);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.checkConnection);
  }

  checkConnection = (isConnected) => {
    console.log('NET INFO: ' + isConnected)
    this.setState({ isConnected })
    this.props.setIsConnected(isConnected)
  }

  render() {
    return (
      (!this.state.isConnected && this.props.isList) ?
        <View
          style={styles.container}
        >
          <Text style={styles.text}>
            Không có kết nối {'\n'}
            Vui lòng kiểm tra lại
                    </Text>
        </View> : <View />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: Screen.width,
    height: Screen.height,
    position: 'absolute',
    backgroundColor: 'white'
  },
  text: {
    color: Color.text, fontSize: 16, textAlign: 'center'
  }
})

const mapActionToState = {
  setIsConnected
};

export default connect(null, mapActionToState)(MyNetInfo)