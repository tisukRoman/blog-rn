import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { AboutScreen } from '../Screens/AboutScreen'
import { MainScreen } from '../Screens/MainScreen'
import { CreateScreen } from '../Screens/CreateScreen'
import { HeaderIcon } from '../Components/HeaderIcon'
import { COLORS } from '../styles/colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();


export const Main = () => {

    const navigation = useNavigation();


    return (
        <Stack.Navigator
            initialRouteName="MainScreen"
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
                name="MainScreen"
                component={MainScreen}
                options={{
                    title: 'Главная',
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                            <Item title='add_post'
                                iconName='add-circle'
                                color={COLORS.WHITE}
                                onPress={() => navigation.navigate("Create")}
                            />
                        </HeaderButtons>),
                }} />
            <Stack.Screen
                name="About"
                component={AboutScreen}
                options={{ title: 'ПОСТ' }} />
            <Stack.Screen
                name="Create"
                component={CreateScreen}
                options={{ title: 'Создать пост' }} />
        </Stack.Navigator>
    )

}