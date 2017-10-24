import React, { Component } from 'react';
import {
  Image,
  FlatList,
  View,
  Text,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Screen, Color, Icons } from '../constants/Styles';
import { loadDataHandle, refreshDataHandle } from '../redux/actions/employeesAction';
import { Header } from '../components/Header';

class EmployeesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
      isApplySearchKey: false
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.isRefreshing !== this.props.isRefreshing && nextProps.isRefreshing) {
      this.props.loadDataHandle(this.props.account.access_token);
    }
  }
  componentDidMount() {
    this.props.loadDataHandle(this.props.account.access_token);
  }

  rederRow(item) {
    console.log(item);
    return (
      <TouchableOpacity
        style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', margin: 5, marginBottom: 2.5, padding: 5, backgroundColor: 'white', borderRadius: 5 }}
      >
        <View>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.FullName}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ marginRight: 5 }} source={Icons.user} />
            <Text >{item.UserName}</Text>
          </View>

        </View>
        <Image source={!item.IsLock ? Icons.lock : Icons.unlock} />
      </TouchableOpacity>);
  }
  render() {
    console.log('render', this.props.employeesData)
    return (
      <View style={styles.container}>
        <Header leftEnabled={false} rightEnabled={false}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, backgroundColor: '#a21041', margin: 10,paddingVertical: 5, borderRadius: 5 }}>
            <Image source={Icons.seach_small} style={{ margin: 5 }} />
            <TextInput
              style={{ flex: 1, padding: 0, color: 'white' }} underlineColorAndroid={'transparent'}
              placeholder="Tìm kiếm..."
              placeholderTextColor="white"
            />
            <Image source={Icons.clearSearch} style={{ margin: 5 }} />
          </View>
        </Header>
        <FlatList
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={() => {
                this.props.refreshDataHandle();
              }}
              title={!this.props.isRefreshing ? '' : 'đang làm mới...'}
            />
          }
          data={this.props.employeesData}
          renderItem={({ item }) => this.rederRow(item)}
          keyExtractor={(item, index) => index}
        />
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
  employeesData: state.employees.employeesData,
  isRefreshing: state.employees.isRefreshing,
  account: state.auth.account
});
const mapActionToState = {
  refreshDataHandle,
  loadDataHandle
};

export default connect(mapStateToProps, mapActionToState)(EmployeesScreen);