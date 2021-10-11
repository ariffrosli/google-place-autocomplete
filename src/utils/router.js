import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/home'
import { ListPlace } from '../screens/listItemSearch'

const Stack = createNativeStackNavigator();

const Navigation = ({}) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={Home} />
                <Stack.Screen name="Search History" component={ListPlace} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export { Navigation };