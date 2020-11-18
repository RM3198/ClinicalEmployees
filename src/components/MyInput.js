import React from 'react'
import {View, TextInput} from 'react-native'
import Icon  from 'react-native-vector-icons/Ionicons'
import AwesomeIcon  from 'react-native-vector-icons/FontAwesome'



const MyInput = (props) => {
    //icon
    //iconColor
    //
    return(
        <View style={[{borderWidth:0.5,marginTop:15,padding:5,borderRadius:20, flexDirection:'row', justifyContent:'center', alignItems:'center'},props.container]}>
            {
                props.fontType?
                <AwesomeIcon name={props.icon} color={props.iconColor} size={20} style={[{paddingLeft:5},props.iconStyle]}/>  
                :
                <Icon name={props.icon} color={props.iconColor} size={20}/>
            }
               
                <TextInput
                value={props.value}
                placeholder={props.placeholder}
                onChangeText={(text)=>props.onChangeText(text)}
                secureTextEntry={props.secure?props.secure:null}
                selectionColor={props.selectionColor?props.selectionColor:'black'}
                style={{flex:1,padding:0, paddingLeft:10}}/>
            {
                props.rightIcon?
                <Icon 
                onPress={props.onRightIconPress}
                name={props.rightIcon} color={props.rightIconColor} size={20} style={{paddingRight:5, padding:5}}/>
                :
                null
                
            }
        </View>
    )
}

export default MyInput