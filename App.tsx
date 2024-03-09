import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Main from './src/screens/Main';
import { ModalPortal } from 'react-native-modals';
import React from 'react';

export const theme = {
  dark: 'dark',
  light: 'light',
} as const;

const AsyncRootLayout = (): JSX.Element => {
  return <RootLayoutNav />;
};
const Stack = createStackNavigator();
const RootLayoutNav = (): JSX.Element => {
  return (
    <>
      <GestureHandlerRootView style={styles.flexBlackBg}>
        <SafeAreaProvider>
          <StatusBar
            backgroundColor="#0066cc"
            barStyle="light-content"
          />

          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator:
                  CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
                animationEnabled: true,
              }}
            >
              <Stack.Screen
                name="Main"
                component={Main}
                options={{ gestureEnabled: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
      <ModalPortal />
    </>
  );
};

const styles = StyleSheet.create({
  flexBlackBg: { flex: 1, backgroundColor: 'black' },
  centerItems: { alignItems: 'center', justifyContent: 'center' },
  logo: { width: 120, height: 120 },
});

registerRootComponent(AsyncRootLayout);

export default AsyncRootLayout;
