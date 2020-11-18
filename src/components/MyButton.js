import React from 'react'
import { Text, TouchableOpacity
 } from 'react-native'

const MyButton = (props) => {
    return(
        <TouchableOpacity 
        onPressIn={props.onPress}
        activeOpacity={0.8}
        style={[{justifyContent:'center', alignItems:'center', backgroundColor:'black', padding:15, marginTop:10, borderRadius:10}, props.style1]}>
            <Text style={[{color:'white', fontSize:17 },props.style2]}>{props.text}</Text>
        </TouchableOpacity>
    )
}



export default MyButton