import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../config/theme'

const MyButton = (props) => {
    return(
        <View style={{padding:5}}>
        <TouchableOpacity 
        activeOpacity={0.8}
        onPress={props.onPress}
        style={{padding:20, justifyContent:'center', alignItems:'center', flex:1,backgroundColor:Colors.primaryColor, margin:5, borderRadius:5, elevation:5}}>
            <Text style={{color:'white', fontSize:16}}>{props.text}</Text>
        </TouchableOpacity>
        </View>
    )
}

export default MyButton