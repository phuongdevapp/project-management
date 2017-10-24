import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Screen, Color, Icons, Title } from '../constants/Styles';
import { Header } from '../components/Header';
import { changePassHandle } from '../redux/actions/authAction';

class ChangePassScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPass: '',
      confirmPass: ''
    }
  }
  onCompleteHandle() {
    this.props.changePassHandle({ access_token: this.props.account.access_token, password: this.state.newPass, confirmPassword: this.state.confirmPass });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header rightEnabled={false} iconLeft={Icons.back_white} onLeft={() => this.props.navigation.goBack()}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={Title}>
              Đổi mật khẩu
          </Text>
          </View>
        </Header>
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
          <View pointerEvents={this.props.isLoading ? "none" : "auto"} style={{ flex: 1 }}>
            <Text style={{ alignSelf: 'center', color: 'black', fontSize: 15, marginVertical: 20 }}>
              Thiết lập lại mật khẩu
          </Text>
            <View style={{ flex: 1, marginHorizontal: 20, borderColor: Color.grayBorder, borderWidth: 0.5, borderRadius: 10 }}>
              <TextInput
                secureTextEntry
                style={{ padding: 10, borderBottomWidth: 0.5, borderBottomColor: Color.grayBorder }}
                underlineColorAndroid="transparent"
                placeholder="Mật khẩu mới"
                value={this.state.newPass}
                onChangeText={(text) => this.setState({ newPass: text })}
              />
              <TextInput
                secureTextEntry
                style={{ padding: 10 }}
                underlineColorAndroid="transparent"
                placeholder="Xác nhận lại mật khẩu mới"
                value={this.state.confirmPass}
                onChangeText={(text) => this.setState({ confirmPass: text })}
              />
            </View>
            <TouchableOpacity
              style={{ marginTop: 20, marginHorizontal: 20, padding: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.appTheme, borderRadius: 5 }}
              onPress={this.onCompleteHandle.bind(this)}
            >
              {this.props.isLoading ? <ActivityIndicator /> : <Text style={{ color: 'white', fontWeight: 'bold' }}>HOÀN TẤT</Text>}
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View >
    );
  }
}

const mapStateToProps = state => ({
  account: state.auth.account,
  isLoading: state.changePass.isLoading
});
const mapActionToState = {
  changePassHandle,
};
export default connect(mapStateToProps, mapActionToState)(ChangePassScreen);