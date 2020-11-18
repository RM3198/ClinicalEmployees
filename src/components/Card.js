import React from 'react'
import { TouchableOpacity,Text, Image } from 'react-native'
import { Colors } from '../config/theme'

const Card = (props) => {
    //cardStyle
    return(
        <TouchableOpacity 
        activeOpacity={0.7}
        onPressIn={props.onPress}
        style={[{padding:10,flex:1, justifyContent:'center', alignItems:'center', backgroundColor:Colors.secondary, borderRadius:10, margin:10, elevation:5}, props.cardStyle]}>
            {/* <Image source={require()} */}
            <Image source={props.image} resizeMode={'contain'} style={{height:50, width:50,}}/>
            <Text style={{color:'white', marginTop:20, fontSize:15, opacity:0.8}}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default Card