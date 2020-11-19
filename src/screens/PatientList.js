import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import  Icon  from 'react-native-vector-icons/Ionicons'
import Realm from 'realm';
import MyButton from '../components/MyButton';
import { Colors } from '../config/theme'

let realm;

const PatientList = (props) => {

    const dummypatients = ['Akbar Ali','Fatima', 'Ahmed Raza','Muhammad Rizwan','Ahmad Dar', 'Muhammad Saqib','Muhammad Kashif','Faseeh','Ahmar hussain','Syed Khizer']
    const dummyTasks = ['Ultrasound','Surgical Simulation','EMR', 'MRI', 'CT Scan', 'Consultancy','TR Simulation','Root Canal','Root extraction', 'Surgery']
    const bool = [true, false]
    const [patient, setPatients] = useState([])

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

    useEffect(()=> {
          Realm.open({schema: [taskList, patientListSchema] 
            ,schemaVersion: 1
        })
            .then(realm => {
                var patients = realm.objects('patientList');
                if (patients.length == 0) {
                   _add_data() 
                }
                else{
                    setPatients(patients)
                    console.log(patients[0].tasks)
                }
            })

       
    },[])

    const _navigate_to = (index, item) => {
        Navigation.push(props.componentId, {
            component: {
              name: 'Tasks',
              passProps: {
                  data: item,
                  name: props.name
              }, 
              options: {
                topBar: {
                    backButton:{
                        color:'white'
                    },
                  visible:true,
                  title: {
                    text: item.patient
                  }
                }
              }
            }
            
          });
    }

    const _add_data = () => {
        Realm.open({schema: [taskList, patientListSchema] 
            ,schemaVersion: 1
        })
            .then(realm => {
                for(let i=0; i<10; i++){
                    realm.write(() => {
                        let patient = realm.create('patientList', {
                            id: i+1, 
                            patient: dummypatients[i],
                            tasks: []
                        });
                        for(let y=0; y<10; y++){
                            var randomtask = dummyTasks[(Math.random() * dummyTasks.length) | 0]
                            var randombool1 = bool[(Math.random() * bool.length) | 0]
                            var randombool2 = bool[(Math.random() * bool.length) | 0]
                            patient.tasks.push({task:randomtask, toggle:randombool1, radioButton:randombool2});
                        }
                    });
                }
                var patients = realm.objects('patientList');
                console.log(patients)
                setPatients(patients)
            })
   
    }

    const _renderList = ({item, index}) => {
        return(
            <TouchableOpacity 
            activeOpacity={0.8}
            onPress={()=>_navigate_to(index, item)}
            style={{padding:15,borderRadius:10,opacity:0.8, backgroundColor:'white', elevation:5, margin:5, flexDirection:'row', alignItems:'center'}}>
                <Icon name={'fitness-outline'} size={25} color={Colors.secondary} style={{opacity:0.9}}/>
                <Text style={{color:'black', opacity:0.8, fontSize:17, paddingLeft:10}}>{item.patient}</Text>
            </TouchableOpacity>
        )
    }

    return(
        <View style={{flex:1, backgroundColor:Colors.background}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon name={'person-circle-outline'} size={60} color={Colors.primaryColor} style={{opacity:0.8, padding:5, paddingTop:10}}/>
                <View>
                    <Text style={{fontSize:26, padding:5, paddingBottom:0, opacity:0.7, fontWeight:'700'}}>Employee's Name</Text>
                    <Text style={{fontSize:20, paddingLeft:8, opacity:0.7, color:Colors.secondary}}>Hi {props.name}</Text>
                    {/* <MyButton text={'add data'} onPress={()=>_add_data()}/> */}
                </View>
            </View>
            <FlatList
            style={{marginTop:10}}
            ListEmptyComponent={()=> <ActivityIndicator color={'navy'} size={'large'}/>}
            data={patient}
            keyExtractor={(_, index)=> index.toString()}
            renderItem={_renderList}
            />
        </View>
    )
}

export default PatientList