import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Screen } from '../constants/Styles';
import MainTabNavigator from '../navigators/MainTabNavigator';

class EmployeesScreen extends Component {
  render() {
    return (
      <MainTabNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {

  },
  background: {
    width: Screen.width,
    height: Screen.height
  }
});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(EmployeesScreen);