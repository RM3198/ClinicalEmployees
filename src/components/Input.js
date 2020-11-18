import React from 'react'
import { TextInput } from 'react-native'

const Input = (props) => {
    //style
    //placeholder
    return(
        <TextInput
        style={[{flex:1, borderWidth:0.5, margin:5, borderRadius:50, paddingLeft:20, fontSize:16},props.style]}
        placeholder={props.placeholder}
        selectionColor={'gray'}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        
        // numberOfLines={props.lines}
        />
    )
}
export default Input