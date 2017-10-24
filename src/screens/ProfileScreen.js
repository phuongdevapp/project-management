import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Screen, Color, Images, Icons } from '../constants/Styles';
import { logoutHandle } from '../redux/actions/authAction';

class ProfileScreen extends Component {
  onLogout() {
    Alert.alert(
      'Thông báo',
      'Bạn có chắc chắn muốn thoát',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đồng ý', onPress: () => this.props.logoutHandle(this.props.account.access_token) },
      ],
      { cancelable: false }
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          <ImageBackground style={{ width: Screen.width, height: Screen.height, paddingBottom: 10 }} source={Images.background} resizeMode="cover">
            <View style={{ width: Screen.width, height: Screen.height, position: 'absolute', backgroundColor: 'rgba(162, 16, 65, 0.7)', justifyContent: 'center', alignItems: 'center' }} />
            <View style={{ width: Screen.width, height: Screen.height, position: 'absolute' }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={Images.defaultAvatar} style={{ borderRadius: 40, width: 80, height: 80, borderWidth: 5, borderColor: 'white' }} />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{this.props.account.userName}</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: 'white' }}>
                <TouchableOpacity
                  style={{ paddingVertical: 10, marginHorizontal: 10, flexDirection: 'row', borderBottomColor: Color.grayBorder, borderBottomWidth: 1 }}
                  onPress={() => this.props.navigation.navigate('changePass')}
                >
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: 'rgb(0, 150, 255)',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5
                    }}
                  >
                    <Image source={Icons.changePass} />
                  </View>
                  <Text style={{ fontSize: 18, color: 'rgb(41, 50, 53)', marginLeft: 10 }}>Đổi mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingVertical: 10, marginHorizontal: 10, flexDirection: 'row', borderBottomColor: Color.grayBorder, borderBottomWidth: 1 }}
                  onPress={this.onLogout.bind(this)}
                >
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5
                    }}
                  >
                    <Image source={Icons.logout} />
                  </View>
                  <Text style={{ fontSize: 18, color: 'rgb(41, 50, 53)', marginLeft: 10 }}>Đăng xuất</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
  },
  background: {
    width: Screen.width,
    height: Screen.height
  }
});

const mapStateToProps = state => ({
  account: state.auth.account
});
const mapActionToState = {
  logoutHandle
};

export default connect(mapStateToProps, mapActionToState)(ProfileScreen);