import React, { Component } from 'react';
import {
  ToastAndroid,
  Clipboard,
  TouchableOpacity,
  Image,
  View,
  Text,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { Screen, Title, Icons, Color } from '../constants/Styles';
import { getDetailHandle, resetStateByKey, getAccount, updateStatusAccount } from '../redux/actions/projectDetailAction';
import { Header } from '../components/Header';

class ProjectDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      uboderColor: Color.grayBorder,
      sboderColor: Color.grayBorder,
      showVerify: false,
      verifyKey: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.detail) {
      if (this.props.detail.Username !== nextProps.detail.Username) {
        this.setState({ uboderColor: 'red' });
      }
      if (this.props.detail.Status !== nextProps.detail.Status) {
        this.setState({ sboderColor: 'red' });
      }
    }

  }
  writeToClipboard = async (text) => {
    await Clipboard.setString(text);
    ToastAndroid.show('Đã sao chép đến Clipboard !', ToastAndroid.SHORT)
  };
  componentDidMount() {
    console.log('params', this.props.navigation.state.params);
    this.props.getDetailHandle({ access_token: this.props.account.access_token, projectId: this.props.navigation.state.params.projectsItem.Id });
  }
  componentWillUnmount() {
    this.props.resetStateByKey({ key: 'state', path: '', value: null });
  }
  renderActionSheetModal() {
    return (
      <Modal
        animationType="none"
        transparent
        visible={this.state.showModal}
        onRequestClose={() => this.setState({ showModal: false })}
      >
        <TouchableWithoutFeedback onPress={() => this.setState({ showModal: false })}>
          <View style={{ flex: 1, backgroundColor: 'rgba(162, 16, 65, 0.5)', justifyContent: 'center', alignItems: 'center' }}>

            {this.state.showVerify ? <View style={{ borderRadius: 5, position: 'absolute', backgroundColor: 'white', width: Screen.width * 0.7 }}>
              <TextInput
                placeholder="Nhập key"
              />
              <TouchableOpacity
                onPress={() => {
                  this.props.updateStatusAccount({ access_token: this.props.account.access_token, projectId: this.props.detail.Id, verifyKey: this.state.verifyKey, status: false });
                  this.setState({ showModal: false });
                }}
              >
                <Text>Xác thực</Text>
              </TouchableOpacity>
            </View> : <View style={{ borderRadius: 5, backgroundColor: 'white', width: Screen.width * 0.7 }}>
                <TouchableOpacity
                  style={{ justifyContent: 'center' }}
                  onPress={() => {
                    this.props.getAccount({ access_token: this.props.account.access_token, projectId: this.props.detail.Id });
                    this.setState({ showModal: false });
                  }}
                >
                  <Text style={{ margin: 10 }}>Get account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: Color.grayBorder }}>
                  <Text style={{ margin: 10 }}>Get key</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ margin: 10 }}>Lock account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderBottomColor: Color.grayBorder, borderBottomWidth: 0.5, borderTopColor: Color.grayBorder, borderTopWidth: 0.5 }}>
                  <Text style={{ margin: 10 }}>Unlock account</Text>
                </TouchableOpacity>
              </View>}
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    );
  }
  render() {
    if (this.props.initComponent) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <ActivityIndicator style={{ alignSelf: 'center' }} />
          <Text>Đang tải dữ liệu</Text>
        </View>
      );
    }
    if (this.props.detail) {
      const { Id, Name, DBName, DBIP, DBUsername, DBPassword, Username, Password, PassEncrypt, KeyConnect, Category, Status } = this.props.detail;
      return (
        <View style={styles.container}>
          <Header
            iconRight={Icons.actionSheet}
            iconLeft={Icons.back_white}
            onLeft={() => this.props.navigation.goBack()}
            onRight={() => this.setState({ showModal: !this.state.showModal })}
          >
            <Text style={Title}>{Name}</Text>
          </Header>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            <View style={styles.field}>
              <Text style={styles.fieldName}>DBName</Text>
              <View style={styles.entry}>
                <Text >{DBName}</Text>
                <TouchableOpacity style={styles.copyButton} onPress={() => this.writeToClipboard(DBName)}>
                  <Image source={Icons.copy} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldName}>DBIP</Text>
              <View style={styles.entry}>
                <Text >{DBIP}</Text>
                <TouchableOpacity style={styles.copyButton} onPress={() => this.writeToClipboard(DBIP)}>
                  <Image source={Icons.copy} />
                </TouchableOpacity>

              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldName}>DBUsername</Text>
              <View style={styles.entry}>
                <Text >{DBUsername}</Text>
                <TouchableOpacity style={styles.copyButton} onPress={() => this.writeToClipboard(DBUsername)}>
                  <Image source={Icons.copy} />
                </TouchableOpacity>

              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldName}>DBPassword</Text>
              <View style={styles.entry}>
                <Text >{DBPassword}</Text>
                <TouchableOpacity style={styles.copyButton} onPress={() => this.writeToClipboard(DBPassword)}>
                  <Image source={Icons.copy} />
                </TouchableOpacity>

              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldName}>Username</Text>
              <View style={[styles.entry, { borderColor: this.state.uboderColor }]}>
                <Text >{Username}</Text>
                <TouchableOpacity style={styles.copyButton} onPress={() => this.writeToClipboard(Username)}>
                  <Image source={Icons.copy} />
                </TouchableOpacity>

              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldName}>Password</Text>
              <View style={[styles.entry, { borderColor: this.state.uboderColor }]}>
                <Text >{Password}</Text>
                <TouchableOpacity style={styles.copyButton} onPress={() => this.writeToClipboard(Password)}>
                  <Image source={Icons.copy} />
                </TouchableOpacity>

              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldName}>PassEncrypt</Text>
              <View style={styles.entry}>
                <Text >{PassEncrypt}</Text>
                <TouchableOpacity style={styles.copyButton}>
                  <Image source={Icons.copy} onPress={() => this.writeToClipboard(PassEncrypt)} />
                </TouchableOpacity>

              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldName}>KeyConnect</Text>
              <View style={{
                flex: 7,
                marginLeft: 20,
                borderColor: Color.grayBorder,
                paddingLeft: 5,
                borderWidth: 0.5,
                borderRadius: 5
              }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }} />
                  <TouchableOpacity style={styles.copyButton} onPress={() => this.writeToClipboard(KeyConnect)}>
                    <Image source={Icons.copy} />
                  </TouchableOpacity>
                </View>
                <Text>{KeyConnect}</Text>
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldName}>Category</Text>
              <View style={styles.entry}>
                <Text >{Category}</Text>
                <TouchableOpacity style={styles.copyButton} onPress={() => this.writeToClipboard(Category)}>
                  <Image source={Icons.copy} />
                </TouchableOpacity>

              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldName}>Status</Text>
              <View style={[styles.entry, { borderColor: this.state.sboderColor }]}>
                <Text >{Status.toString()}</Text>
                <TouchableOpacity style={styles.copyButton} onPress={() => this.writeToClipboard(Status.toString())}>
                  <Image source={Icons.copy} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {this.renderActionSheetModal()}
        </View >
      );
    }
    return (<View />);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    margin: 5
  },
  background: {
    width: Screen.width,
    height: Screen.height
  },
  entry: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 20,
    borderColor: Color.grayBorder,
    paddingLeft: 5,
    borderWidth: 0.5,
    borderRadius: 5
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10
  },
  fieldName: {
    flex: 2
  },
  copyButton: { padding: 7 }
});

const mapStateToProps = state => ({
  account: state.auth.account,
  initComponent: state.projectDetail.initComponent,
  isLoading: state.projectDetail.isLoading,
  isRefreshing: state.projectDetail.isRefreshing,
  detail: state.projectDetail.detail,
  DETAIL_PROJECT_ERROR: state.projectDetail.DETAIL_PROJECT_ERROR
});
const mapActionToState = {
  getAccount,
  getDetailHandle,
  resetStateByKey,
  updateStatusAccount
};

export default connect(mapStateToProps, mapActionToState)(ProjectDetailScreen);