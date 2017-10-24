import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Screen, Color, Images } from '../constants/Styles';
import { loginHandle } from '../redux/actions/authAction';
import MyNetInfo from '../components/MyNetInfo';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  onLoginHandle() {
    if(this.props.isConnected)
    {
      const { username, password } = this.state;
      if (!username) {
        Alert.alert('Thông báo', 'Vui lòng nhập tên đăng nhập');
      } else if (!password) {
        Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu');
      } else {
        this.props.loginHandle({ username: this.state.username, password: this.state.password })
      }
    }
    else {
      Alert.alert('Thông báo', 'Không có kết nối internet!')
    }
  }
  render() {

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          <ImageBackground style={{ width: Screen.width, height: Screen.height, paddingBottom: 10 }} source={Images.background} resizeMode="cover">
            <View style={{ width: Screen.width, height: Screen.height, position: 'absolute', backgroundColor: 'rgba(162, 16, 65, 0.7)', justifyContent: 'center', alignItems: 'center' }} />
            <View style={{ width: Screen.width, height: Screen.height, position: 'absolute' }}>

              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image source={Images.logo} style={{ marginTop: 50 }} />
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Solution for Project Manager</Text>
                {this.props.isLoading ? <View style={{ width: Screen.width * 0.7, marginTop: 100, alignItems: 'center' }}>
                  <ActivityIndicator />
                  <Text style={{ color: 'white' }}>Đang xác thực</Text>
                </View> : <View style={{ width: Screen.width * 0.7, marginTop: 50 }}>
                    <TextInput
                      style={{ padding: 10, backgroundColor: 'white', borderRadius: 45 }}
                      underlineColorAndroid="transparent"
                      autoCorrect={false}
                      returnKeyType={"next"}
                      value={this.state.username}
                      placeholder="Tên đăng nhập"
                      onSubmitEditing={() => {
                        this.refs.second.focus()
                      }}
                      onChangeText={(username) => this.setState({ username })}

                    />
                    <TextInput
                      ref="second"
                      secureTextEntry
                      autoCorrect={false}
                      returnKeyType={"done"}
                      style={{ padding: 10, marginTop: 10, backgroundColor: 'white', borderRadius: 45 }}
                      underlineColorAndroid="transparent"
                      value={this.state.password}
                      placeholder="Mật khẩu"
                      onSubmitEditing={() => this.onLoginHandle()}
                      onChangeText={(password) => { this.setState({ password }) }}
                    />
                    <TouchableOpacity
                      style={{ marginTop: 20, padding: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#740b2e', borderRadius: 45 }}
                      onPress={() => this.onLoginHandle()}
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
                  </View>}

              </View>
            </View>
          </ImageBackground>
        </ScrollView>
        <MyNetInfo />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1, justifyContent: 'center'
  },
  content: {

  },
  background: {
    width: Screen.width,
    height: Screen.height
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  isConnected: state.netInfo.isConnected
});

const mapActionToState = {
  loginHandle
};

export default connect(mapStateToProps, mapActionToState)(LoginScreen);