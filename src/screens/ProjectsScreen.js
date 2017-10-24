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
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Screen, Color, Icons } from '../constants/Styles';
import { loadDataHandle, refreshDataHandle, resetStateByKey } from '../redux/actions/projectsAction';
import { Header } from '../components/Header';
import MyNetInfo from '../components/MyNetInfo';

class ProjectsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
      isApplySearchKey: false,
      configFilter: [
        {
          "Id": 1,
          "Name": "LandSoft"
        },
        {
          "Id": 2,
          "Name": "Building"
        },
        {
          "Id": 3,
          "Name": "CRM"
        },
        {
          "Id": 4,
          "Name": "BMS"
        },
        {
          "Id": 5,
          "Name": "POS"
        },
        {
          "Id": 6,
          "Name": "Website"
        }
      ]
    }
  }
  componentWillMount() {
    this.setState({
      configFilter: _.map(this.state.configFilter, o => ({ ...o, applyFilter: o.Id === 1, colorSelected: 'white', colorUnSelected: 'black' }))
    });
  }
  componentWillUpdate(nextProps, nextState) {
    if ((nextProps.isRefreshing !== this.props.isRefreshing && nextProps.isRefreshing) || (nextProps.initList !== this.props.initList && nextProps.initList)) {
      this.props.loadDataHandle({
        access_token: this.props.account ? this.props.account.access_token : '',
        cateId: _.find(this.state.configFilter, o => o.applyFilter).Id,
        keyword: this.state.isApplySearchKey ? this.state.searchKey : ''
      })
    }
  }
  componentDidMount() {
    this.props.loadDataHandle({
      access_token: this.props.account ? this.props.account.access_token : '',
      cateId: _.find(this.state.configFilter, o => o.applyFilter).Id,
      keyword: this.state.isApplySearchKey ? this.state.searchKey : ''
    });
  }
  filterOptionItem(item) {
    return (
      <TouchableOpacity
        key={item.Id}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: item.applyFilter ? Color.appTheme : null,
          borderWidth: 1,
          borderRadius: 15,
          paddingLeft: 5,
          paddingRight: 5,
          height: 30,
          borderColor: !item.applyFilter ? Color.grayBorder : 'white',
          height: 30
        }}
        onPress={() => {
          this.setState({
            configFilter: this.state.configFilter.map((e) => {
              if (e.Id !== item.Id) { return { ...e, applyFilter: false }; }
              return { ...e, applyFilter: true };
            })
          }, () => { this.props.refreshDataHandle(); });
        }}
      >
        <Text style={{ color: item.applyFilter ? item.colorSelected : item.colorUnSelected }}>{item.Name}</Text>
      </TouchableOpacity>
    );
  }
  renderFilter() {
    return (
      <View style={{ paddingVertical: 3, flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-around' }} >
        {this.state.configFilter.map((item, key) => this.filterOptionItem(item))}
      </View>
    );
  }
  rederRow(item) {
    return (
      <TouchableOpacity
        style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', margin: 5, marginBottom: 2.5, padding: 5, backgroundColor: 'white', borderRadius: 5 }}
        onPress={() => this.props.navigation.navigate('projectdetail', { projectsItem: item })}
      >
        <View>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.Name}</Text>
          <Text>{item.DBIP}</Text>
        </View>
        <Image source={item.Status ? Icons.status_false : Icons.status_true} />
      </TouchableOpacity>);
  }
  renderList() {
    if (this.props.initList || this.props.isRefreshing) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopWidth: 0.5 }} >
          <ActivityIndicator />
          <Text>Đang tải dữ liệu</Text>
        </View>
      );
    }
    if (this.props.PROJECTS_LOAD_ERROR && this.props.PROJECTS_LOAD_ERROR.hasError) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 0.5 }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Image resizeMode="contain" square source={Images.errorLogo} style={{ height: 150, width: 200 }} /> */}
            <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 32 }}>LỖI KẾT NỐI</Text>
            <TouchableOpacity
              style={{
                backgroundColor: Color.appTheme,
                margin: 10,
                borderRadius: 5,
                width: 100,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {
                this.props.resetStateByKey({ key: 'initList', path: '', value: true });
              }}
            >
              <Text style={{ color: 'white' }}>THỬ LẠI</Text>
            </TouchableOpacity>
          </View>

        </View>);
    }
    if (this.props.projectsData.length == 0) {
      return (<View
        style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 0.5 }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* <Thumbnail resizeMode="contain" square source={Images.emtryLogo} style={{ height: 100, width: 150 }} /> */}
          <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 32 }}>KHÔNG CÓ DỮ LIỆU</Text>
          <TouchableOpacity
            style={{
              backgroundColor: Color.appTheme,
              margin: 10,
              borderRadius: 5,
              width: 100,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => {
              this.props.resetStateByKey({ key: 'initList', path: '', value: true });
            }}
          >
            <Text style={{ color: 'white' }}>TẢI LẠI</Text>
          </TouchableOpacity>
        </View>
      </View>);
    }
    return (
      <View style={{ flex: 1 }}>
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
          data={this.props.projectsData}
          renderItem={({ item }) => this.rederRow(item)}
          keyExtractor={(item, index) => index}
        />
        <MyNetInfo isList={true} />
      </View>



    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Header leftEnabled={false} rightEnabled={false}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, backgroundColor: '#a21041', margin: 10, paddingVertical: 5, borderRadius: 5 }}>
            <Image source={Icons.seach_small} style={{ margin: 5 }} />
            <TextInput
              style={{ flex: 1, padding: 0, color: 'white' }} underlineColorAndroid={'transparent'}
              placeholder="Tìm kiếm..."
              placeholderTextColor="white"
              value={this.state.searchKey}
              returnKeyType="search"
              autoCorrect={false}
              onSubmitEditing={() => {
                this.setState({ isApplySearchKey: true }, () => {
                  this.props.refreshDataHandle();
                });
              }}
              onChangeText={(searchKey) => {
                this.setState({ searchKey }, () => {
                  if (searchKey.length === 0) {
                    if (this.state.isApplySearchKey) {
                      this.setState({ searchKey: '', isApplySearchKey: false }, () => { this.props.refreshDataHandle(); });
                    }
                  }
                });
              }}
            />
            <TouchableOpacity
              onPress={() => {
                const isApplySearchKeyOld = this.state.isApplySearchKey;
                this.setState({ searchKey: '', isApplySearchKey: false }, () => { if (isApplySearchKeyOld) { this.props.refreshDataHandle(); } });
              }}
            >
              <Image source={Icons.clearSearch} style={{ margin: 5 }} />
            </TouchableOpacity>
          </View>
        </Header>
        {this.renderFilter()}
        {this.renderList()}
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
  projectsData: state.projects.projectsData,
  isRefreshing: state.projects.isRefreshing,
  PROJECTS_LOAD_ERROR: state.projects.PROJECTS_LOAD_ERROR,
  initList: state.projects.initList,
  account: state.auth.account,
  isConnected: state.netInfo.isConnected
});

const mapActionToState = {
  refreshDataHandle,
  loadDataHandle,
  resetStateByKey
};
export default connect(mapStateToProps, mapActionToState)(ProjectsScreen);