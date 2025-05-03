import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Navbar() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Rick & Morty </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#20232a",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  title: {
    color: "#3ec7e6",
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "#97ce4c",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});