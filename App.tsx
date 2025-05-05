import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/types/navigation";

import client from "./src/apollo/client";
import LaunchList from "./src/components/LaunchList";
import Character from "./src/components/Character";
import Navbar from "./src/components/navbar";

// allowing for multiple pages
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    Schwifty: require("./assets/fonts/get_schwifty.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LaunchList">
          <Stack.Screen
            name="LaunchList"
            component={LaunchList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Character"
            component={Character}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#3ec7e6",
  },
  content: {
    flex: 1,
    backgroundColor: "121212",
  },
});
