import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/config/screens';
import { Colors } from './src/config/theme';

registerScreens();

    Navigation.setRoot({
        root: {
            stack: {
              id: 'Auth',
              options:{
                statusBar: {
                  backgroundColor: 'black',
                },
                topBar:{
                    visible:false
                }
              },
              children: [
                {
                  component: {
                    name: 'Login',       
                  }
                  
                }
            ],
            }
          }
})

Navigation.setDefaultOptions({
    
    topBar: {
        title:{
            color:'white'
        },
        background:{
            color:Colors.primaryColor
        },
        visible:false
        
    },

    
  });