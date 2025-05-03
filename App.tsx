import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { ApolloProvider } from '@apollo/client';
import client from './src/apollo/client';
import LaunchList from './src/components/LaunchList';
import Navbar from './src/components/navbar';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Schwifty': require('./assets/fonts/get_schwifty.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.safeArea}>
        <Navbar />
        <View style={styles.content}>
          <LaunchList />
        </View>
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3ec7e6',
  },
  content: {
    flex: 1,
    backgroundColor: '121212',
  },
});