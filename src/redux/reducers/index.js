import { combineReducers } from 'redux';
import nav from './navReducer';
import auth from './authReducer';
import projects from './projectsReducer';
import projectDetail from './projectDetailReducer';
import employees from './employeesReducer';
import changePass from './changePassReducer';
import netInfo from './netReducer';

export default combineReducers({
  nav,
  auth,
  projects,
  projectDetail,
  employees,
  changePass,
  netInfo
});