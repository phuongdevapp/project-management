import React, { Component } from 'react';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import { Image } from 'react-native';
import ProjectsScreen from '../screens/ProjectsScreen';
import EmployeesScreen from '../screens/EmployeesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProjectDetailScreen from '../screens/ProjectDetailScreen';
import MapScreen from '../screens/MapScreen';
import ChangePassScreen from '../screens/ChangePassScreen';
import { Icons } from '../constants/Styles';


export const ProjectsStack = StackNavigator({
  projects: {
    screen: ProjectsScreen
  },
  projectdetail: {
    screen: ProjectDetailScreen,
    navigationOptions: {
      tabBarVisible: false
    }
  }
},
  {
    headerMode: 'none',
    navigationOptions: { gesturesEnabled: false }
  });

export const EmployeesStack = StackNavigator({
  employees: {
    screen: EmployeesScreen
  }
},
  {
    headerMode: 'none',
    navigationOptions: { gesturesEnabled: false }
  });

export const AccountStack = StackNavigator({
  profile: {
    screen: ProfileScreen
  },
  changePass: {
    screen: ChangePassScreen
  }
},
  {
    headerMode: 'none',
    navigationOptions: { gesturesEnabled: false }
  });

export default TabNavigator({
  projectsStack: {
    screen: ProjectsStack,
    navigationOptions: {
      title: 'Dự án'
    }
  },
  employeesStack: {
    screen: EmployeesStack,
    navigationOptions: {
      title: 'Nhân viên'
    }
  },
  accountStack: {
    screen: AccountStack,
    navigationOptions: {
      title: 'Tài khoản'
    }
  } 
  // mapStack: {
  //   screen: MapScreen,
  //   navigationOptions: {
  //     title: 'Bản đồ'
  //   }
  // }
},
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconTab;
        switch (routeName) {
          case 'projectsStack':
            iconTab = Icons.projects;
            break;
          case 'employeesStack':
            iconTab = Icons.employees;
            break;
          case 'accountStack':
            iconTab = Icons.account;
            break;
          // case 'mapStack':
          //   iconTab = Icons.map;
          //   break;
          default: break;
        }
        return (
          <Image source={iconTab} style={{ tintColor, height: 24, width: 24 }} />
        );
      }
    }),
    lazy: true,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#E91E63'
    }
  });