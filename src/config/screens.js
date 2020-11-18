import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent('Login', () => require('../screens/Login').default);
  Navigation.registerComponent('PatientList', () => require('../screens/PatientList').default);
  Navigation.registerComponent('Tasks', () => require('../screens/Tasks').default);
//   Navigation.registerComponent('AddPatient', () => require('../AddPatient').default);
//   Navigation.registerComponent('AddMedicalRecord', () => require('../AddMedicalRecord').default);
//   Navigation.registerComponent('PatientList', () => require('../PatientList').default);
//   Navigation.registerComponent('Tasks', () => require('../Tasks').default);
//   Navigation.registerComponent('Login', () => require('../AuthScreens/Login').default);
}