import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Switch, Text, TouchableOpacity, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import  Icon  from 'react-native-vector-icons/Ionicons'
import { Colors } from '../config/theme'

const Tasks = (props) => {

    const [tasks, setTasks] = useState([])
    const [dummy, setDumyy] = useState([
        {
            toggle:true,
            radioButton:false,
            task: 'My dummy task'
        },
        {
            toggle:false,
            radioButton:false,
            task: 'My dummy task'
        },
        {
            toggle:true,
            radioButton:false,
            task: 'My dummy task'
        }
    ])

    const taskList = {
        name:'tasks',
        // primaryKey:'id',
        properties: {
          task: 'string',
          toggle: 'bool',
          radioButton: 'bool'

        }
      }
    
      const patientListSchema = {
        name: 'patientList',
        properties: {
            id:     'int',
            patient: 'string',
            // task: 'tasks[]',
            tasks:     {type: 'list', objectType: 'tasks'},
        }
        };

    const _update_db = (i) => {
        // console.log(tasks)
        Realm.open({schema: [taskList, patientListSchema] 
            ,schemaVersion: 1
        })
            .then(realm => {
                realm.write(() => {
                var get = realm.objects('patientList').filtered('id='+props.data.id)
                // console.log('taskkkkkkk......',get[0].tasks[index])
                console.log(get[0].tasks[i].toggle)
                get[0].tasks[i].toggle = !get[0].tasks[i].toggle
                setTasks(get[0].tasks)
                // setTasks(get[0].tasks)
                //   setTasks(props.data.tasks)
                })  
            })    
    }

    const get_data = (id) => {
        Realm.open({schema: [taskList, patientListSchema] 
            ,schemaVersion: 1
        })
            .then(realm => {
                var get = realm.objects('patientList').filtered('id='+id)
                console.log('taskkkkkkk......',get[0].tasks)
                setTasks(get[0].tasks)
                //   setTasks(props.data.tasks)
                
            })
    }

      useEffect(()=>{
        //  console.log('id......',props.data.id)
        get_data(props.data.id)
        
        // let realm = new Realm({});
        // var get = realm.objects('patientList').filtered('id='+props.id)
        // console.log(get)
        // setTasks(get.tasks)
        // //   setTasks(props.data.tasks)
        // console.log(props.data)
      },[])

    const _renderList = ({item, index}) => {
        // console.log(item)
        return(
            <View
            style={{padding:10, paddingTop:25, paddingBottom:25, elevation:5,borderRadius:10, backgroundColor:'white', margin:5, flexDirection:'row', alignItems:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon name={'receipt'} size={25} color={Colors.secondary} style={{opacity:0.9}}/>
                <Text style={{color:'black',opacity:0.8, fontSize:17, paddingLeft:10, flex:1}}>{item.task}</Text>
                <View style={{flexDirection:'row', padding:6}}>
                {/* <Switch       
                    trackColor={{ false: Colors.lightGray, true: Colors.lightGray }}
                    thumbColor={item.toggle==true?Colors.primaryColor: 'gray'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>_update_db(index)}
                    value={item.toggle}
                /> */}
                <Icon 
                onPress={()=> _update_db(index)}
                name={item.toggle?'square-outline':'ios-checkbox-outline'} size={25} color={Colors.secondary} style={{opacity:0.9}}/>
                {/* <RadioButton selected={item.radioButton}/> */}
                </View>
                

                </View>
            </View>
        )
    }

    const RadioButton = (props) => {
        return (
            <View style={[{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: 'gray',
              marginLeft:5,
              marginRight:5,
              alignItems: 'center',
              justifyContent: 'center',
            }, props.style]}>
              {
                props.selected ?
                  <View style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: Colors.secondary,
                  }}/>
                  : null
              }
            </View>
        );
      }

    return(
        <View style={{flex:1, backgroundColor:Colors.background}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon name={'person-circle-outline'} size={60} color={Colors.primaryColor} style={{opacity:0.8, padding:5, paddingTop:10}}/>
                <View>
                    <Text style={{fontSize:26, padding:5, paddingBottom:0, opacity:0.7, fontWeight:'700'}}>Employee's Name</Text>
                    <Text style={{fontSize:20, paddingLeft:8, opacity:0.7, color:Colors.secondary}}>{props.name}</Text>
                </View>
            </View>
            <FlatList
            style={{marginTop:10}}
            data={tasks}
            keyExtractor={(_, index)=> index.toString()}
            ListEmptyComponent={<ActivityIndicator/>}
            renderItem={_renderList}
            />
        </View>
    )
}

export default Tasks