import {
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';

const { width, height } = Dimensions.get('window');

export const Screen = {
  width,
  height: Platform.OS === 'ios' ? height : height - StatusBar.currentHeight
};

export const Title = {
  fontSize: 20, fontWeight: '400', color: 'white'
};

export const Color = {
  appTheme: '#E91E63',
  red: 'red',
  blue: 'rgb(58, 156, 253)',
  grayBorder: 'rgba(206, 209, 212, 0.5)',
  // placeholder: '#b3dbef', // loginScreen
  // myNavBar: '#2360d5',
  // text: '#7a7a7a',
  // textInput: '#414141',
  // gray: '#e4e4e4',
  // grey: '#f5f5f5',
  // generalButton: '#ffaf39',
  // anotherGray: '#d8d8d8',
  // theme: '#3a4e59',
  // accent: '#f78b4d',
  // light: (opacity = 1) => `rgba(255,255,255,${opacity})`,
  // dark: (opacity = 1) => `rgba(0,0,0,${opacity})`
};

export const Icons = {
  projects: require('../../assets/Icons/ic_tab_home.png'),
  employees: require('../../assets/Icons/ic_member_pink.png'),
  account: require('../../assets/Icons/ic_tab_more.png'),
  status_true: require('../../assets/Icons/ic_party_pink.png'),
  status_false: require('../../assets/Icons/ic_unparty_gray.png'),
  back_white: require('../../assets/Icons/ic_back_white.png'),
  copy: require('../../assets/Icons/ic_content_copy.png'),
  lock: require('../../assets/Icons/ic_lock.png'),
  unlock: require('../../assets/Icons/ic_unlock.png'),
  clearSearch: require('../../assets/Icons/ic_clear_search.png'),
  seach_small: require('../../assets/Icons/ic_search_small.png'),
  user: require('../../assets/Icons/ic_user.png'),
  actionSheet: require('../../assets/Icons/ic_action_sheet.png'),
  changePass: require('../../assets/Icons/ic_repair_white.png'),
  logout: require('../../assets/Icons/ic_logout.png'),
  map: require('../../assets/Icons/ic_tab_map.png')
}

export const Images = {
  background: require('../../assets/Images/bg_login.jpg'),
  defaultAvatar: require('../../assets/Images/defaultAvatar.jpg'),
  // splashscreen: require('../../assets/images/splashscreen.png'),
  logo: require('../../assets/Images/logo.png')
};