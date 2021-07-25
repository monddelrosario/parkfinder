import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Main from '../screens/Main';

const Stack = createStackNavigator();

export default function App() {
  const options = {
    gestureDirection: 'vertical',
    animationEnabled: true,
    headerBackTitleVisible: false,
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
          animationEnabled: true,
        }}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
