import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'

const MainStack = createNativeStackNavigator()

const MainNavigation = ({navigation, route}) => {
    return (
        <MainStack.Navigator>
          {/*  <MainStack.Screen
                options={{headerShown: false, animation: 'flip'}}
                name={routerConstants.NEED_HELP}
                component={NeedHelpS}
            />*/}
        </MainStack.Navigator>
    )
}

export default MainNavigation
