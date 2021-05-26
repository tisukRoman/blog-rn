import React from 'react';
import AppLoading from 'expo-app-loading';
import { COLORS } from './src/styles/colors'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Main } from './src/Screens/Main';
import { Saved } from './src/Screens/Saved';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { DB } from './src/db';


async function initApp() { // INIT FUNCTION  
  try {
    await DB.init();
    console.log('init is success');
  } catch (error) {
    console.log(error);
  }
}

const Tab = createBottomTabNavigator();

export default function App() { // APP COMPONENT

  const [isReady, setIsReady] = React.useState(false);

  if (!isReady) {
    return <AppLoading
      startAsync={initApp}
      onFinish={() => setIsReady(true)}
      onError={console.log('error')}
    />
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Main"
          tabBarOptions={{
            activeTintColor: COLORS.RED,
            inactiveTintColor: COLORS.WHITE,
            activeBackgroundColor: COLORS.DARK,
            inactiveBackgroundColor: COLORS.DARK,
            style: { position: Platform.OS === 'web' ? 'relative' : 'absolute' }
          }}
        >
          <Tab.Screen
            name="Main"
            component={Main}
            options={{
              title: 'ГЛАВНАЯ',
              tabBarIcon: () => <Ionicons name='home' size={24} color={COLORS.WHITE} />
            }} />
          <Tab.Screen
            name="Saved"
            component={Saved}
            options={{
              title: 'ЗАКЛАДКИ',
              tabBarIcon: () => <Ionicons name='bookmark' size={24} color={COLORS.WHITE} />
            }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )

}


