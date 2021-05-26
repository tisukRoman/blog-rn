import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { COLORS } from '../styles/colors'
import { SavedScreen } from './SavedScreen'
import { AboutScreen } from './AboutScreen'


const Stack = createStackNavigator();

export const Saved = () => {
    return (
        <Stack.Navigator
            initialRouteName="SavedScreen"
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.PURPLE,
                },
                headerTitleAlign: 'center',
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stack.Screen
                name="SavedScreen"
                component={SavedScreen}
                options={{ title: 'Избранное' }} />
            <Stack.Screen
                name="About"
                component={AboutScreen}
                options={{ title: 'ПОСТ' }} />
        </Stack.Navigator>
    )
}
