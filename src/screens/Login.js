import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import MyButton from '../components/MyButton';
import MyInput from '../components/MyInput';
// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
//   } from '@react-native-community/google-signin';

import { Colors } from '../config/theme'
import { Navigation } from 'react-native-navigation';
// import MyModal from '../../components/MyModal';

const Login = (props) => {
    // GoogleSignin.configure();
    const [logintab, setlogintab] = useState(true)
    const [loader, setloader] = useState(false)

    const [loginEmail, setLoginEmail] = useState(null) //SIGNIN
    const [loginPassword, setloginPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(true)

    const [name, setname] = useState(null) //SIGNUP 
    const [lastname, setlastname] = useState('')  
    const [signUpEmail, setSignupEmail] = useState(null)
    const [signUpPassword, setSignupPassword] = useState(null)
    const [RetypePassword, setretypePassword] = useState(null)
    const [signUpShowPassword, setShowPass] = useState(true)
    
    
    const _navigate_to = (name) => {
        Navigation.push(props.componentId, {
            component: {
              name: 'PatientList', 
              passProps:{
                name: name
              },
              options: {
                topBar: {
                    backButton:{
                        color:'white'
                    },
                  visible:true,
                  title: {
                    text: 'Patient\'s List'
                  }
                }
              }
            }
            
          });
    }

    const _login = () => {
        if(loginEmail=='Rafay'||loginEmail=='Rufi'||loginEmail=='Tabia'){
            if(loginPassword=='admin'){
                _navigate_to(loginEmail)
            }
            else{
                ToastAndroid.show('password incorrect', ToastAndroid.SHORT)
            } 
        }
        else{
            ToastAndroid.show('Employee name or password incorrect', ToastAndroid.SHORT)
        }
    }



    const _loginForm = () => {
        return(
            <View>
            <MyInput 
            placeholder={'Employee\'s name'}
            value = {loginEmail}
            onChangeText={(email)=> setLoginEmail(email)}
            icon={"person"}
            iconColor={Colors.primaryColor}
            />
            <MyInput 
            value = {loginPassword}
            placeholder={'Password'}
            fontType='fontAwesome'
            secure={showPassword}
            rightIcon={showPassword?'eye-off':'eye'}
            onRightIconPress = {()=>setShowPassword(!showPassword)}
            rightIconColor={'gray'}
            onChangeText={(pass)=> setloginPassword(pass)}
            icon={"lock"}
            iconColor={Colors.primaryColor}
            />

            <MyButton
            onPress={()=>_login()}
            text='Login'
            style1={{backgroundColor:Colors.primaryColor,marginTop:20}}
            />
            </View>
        )
    }

    const _SignUpForm = () => {
        return(
            <View>
               <MyInput 
            placeholder={'First name'}
            value = {name}
            onChangeText={(name)=> setname(name)}
            icon={"person"}
            iconColor={Colors.primaryColor}
            />
            <MyInput 
            placeholder={'Last name'}
            value = {lastname}
            onChangeText={(name)=> setlastname(name)}
            icon={"person"}
            iconColor={Colors.primaryColor}
            />
            <MyInput 
            value = {signUpEmail}
            placeholder={'Email'}
            onChangeText={(email)=> setSignupEmail(email)}
            icon={"mail-open-sharp"}
            iconColor={Colors.primaryColor}
            />
            <MyInput 
            value = {signUpPassword}
            placeholder={'Type Password'}
            fontType='fontAwesome'
            secure={signUpShowPassword}
            rightIcon={signUpShowPassword?'eye-off':'eye'}
            onRightIconPress = {()=>setShowPass(!signUpShowPassword)}
            rightIconColor={'gray'}
            onChangeText={(pass)=> setSignupPassword(pass)}
            icon={"lock"}
            iconColor={Colors.primaryColor}
            />
            <MyInput 
            value = {RetypePassword}
            placeholder={'Retype Password'}
            fontType='fontAwesome'
            secure={signUpShowPassword}
            rightIcon={signUpShowPassword?'eye-off':'eye'}
            onRightIconPress = {()=>setShowPass(!signUpShowPassword)}
            rightIconColor={'gray'}
            onChangeText={(pass)=> setretypePassword(pass)}
            icon={"lock"}
            iconColor={Colors.primaryColor}
            />

            <MyButton
            onPress={()=>_Validate_SignUp()}
            text='Signup'
            style1={{backgroundColor:Colors.primaryColor, marginTop:20}}
            /> 
            </View>
        )
    }

    const _Validate_Login = () => {

        let correctEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (loginEmail==null || loginEmail == ''){
            ToastAndroid.show('Please enter email', ToastAndroid.SHORT)
        }
        else if (!correctEmail.test((loginEmail.trim()))){
            ToastAndroid.show('Incorrect email', ToastAndroid.SHORT)
        }
        else if (loginPassword == '' || loginPassword == null ){
            ToastAndroid.show('Please enter password', ToastAndroid.SHORT)
        }
        else{
            ToastAndroid.show('Login API', ToastAndroid.SHORT)
        }
    }

    const _Validate_SignUp = () => {

        let correctEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (name == null || name == ''){
            ToastAndroid.show('Please enter name', ToastAndroid.SHORT)
        }
        else if (signUpEmail==null || signUpEmail == ''){
            ToastAndroid.show('Please enter email', ToastAndroid.SHORT)
        }
        else if (!correctEmail.test((signUpEmail.trim()))){
            ToastAndroid.show('Invalid email', ToastAndroid.SHORT)
        }
        else if (signUpPassword == '' || signUpPassword == null ){
            ToastAndroid.show('Please enter password', ToastAndroid.SHORT)
        }
        else if (signUpPassword.length < 6){
            ToastAndroid.show('Password should be of 6 letters/digits', ToastAndroid.LONG)
        }
        else if (RetypePassword == '' || RetypePassword == null ){
            ToastAndroid.show('Please retype password', ToastAndroid.SHORT)
        }
        else if( signUpPassword !== RetypePassword){
            ToastAndroid.show('Password not matched', ToastAndroid.SHORT)
        }
        
        else{
            ToastAndroid.show('SignUp API', ToastAndroid.SHORT)
        }
    }

    // const revokeAccess = async () => {
    //     try {
    //       await GoogleSignin.revokeAccess();
    //       console.log('deleted');
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    // const _Google_signIn = async() => {
    //         setloader(true)
    //         GoogleSignin.configure();
    //         try {
    //           await GoogleSignin.hasPlayServices();
    //           const userInfo = await GoogleSignin.signIn();
    //           setloader(false)
    //           console.log(userInfo)
    //             revokeAccess()

              
    //         //   this.setState({ userInfo });
    //         } catch (error) {
    //           if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //               ToastAndroid.show('SignIn cancelled', ToastAndroid.SHORT)
    //                 setloader(false)
    //             // user cancelled the login flow
    //           } else if (error.code === statusCodes.IN_PROGRESS) {
    //             ToastAndroid.show('SignIn in progress', ToastAndroid.SHORT)
    //             setloader(false)
    //             // operation (e.g. sign in) is in progress already
    //           } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             setloader(false)
    //             ToastAndroid.show('Playservices not available', ToastAndroid.SHORT)
    //             // play services not available or outdated
    //           } else {
    //             setloader(false)
    //             ToastAndroid.show('Something went wrong', ToastAndroid.SHORT)
    //             console.log(error)
    //             // some other error happened
    //           }
    //         }
          

    // }

   
// const OR = () => {
//     return(
//         <View style={{flexDirection:'row'}}>
//                     <View style={styles.line}/>
//                     <Text style={{color:Colors.lightGray}}>OR</Text>
//                     <View style={styles.line}/>
//         </View>
//     )
// }


    return(
        <View style={styles.container}>
            <ScrollView 
            keyboardShouldPersistTaps='always'
            style={{borderWidth:1}}>
                <View style={{justifyContent:'center', alignItems:'center', height:150, backgroundColor:Colors.primaryColor}}>
                    <IconEntypo name={logintab?'user':'add-user'} size={50} color={'white'}/>
                </View>
                <View style={{flex:1, backgroundColor:'white', padding:10, top:-30, marginLeft:10, marginRight:10, elevation:9, borderRadius:20}}>
                    <View style={{padding:10, flexDirection:'row', flex:1, backgroundColor:'white'}}>
                        <TouchableOpacity 
                        style={styles.tabView}
                        activeOpacity={0.8} onPressIn={()=> setlogintab(true)}>
                            <Text style={{flex:1, color:logintab?Colors.primaryColor:Colors.lightGray, fontSize:logintab?22:20}}>Login</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity 
                        style={styles.tabView}
                        activeOpacity={0.8} onPressIn={()=> setlogintab(false)}>
                            <Text style={{flex:1, color:!logintab?Colors.primaryColor:Colors.lightGray, fontSize:!logintab?22:20}}>Signup</Text>
                        </TouchableOpacity> */}
                    </View>
                    {
                        logintab? _loginForm() : _SignUpForm()
                    }

                    {/* <Text style={{alignSelf:'center', color:Colors.lightGray, padding:10, marginTop:5}}>Or {logintab? 'Login': 'Signup'} with </Text> */}

                    {/* <GoogleSigninButton
                        style={{ width:'100%', height:55, marginTop:0 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={()=>_Google_signIn()}
                        disabled={false} /> */}

                    {/* <MyButton style1={{borderRadius:0, marginTop:0, backgroundColor:'maroon'}}/> */}
                    {/* <MyModal visible={loader}/> */}
                </View>
            </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'gray',
        
    },
    tabView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    // line:{
    //     flex:1,
    //     borderWidth:0.4,
    //     borderColor:Colors.lightGray,
    //     margin:10,
    // }
})

export default Login
    