import React, { Fragment } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import Navbar from "./navbar";

// query to get attributes about each character
const GET_CHARACTERS = gql`
  query {
    characters(page: 1) {
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;

export default function LaunchList() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <ActivityIndicator size="large" color="green" />;
  if (error)
    return (
      <View>
        <Text>Error fetching data:</Text>
        <Text>{error.message}</Text>
      </View>
    );

  // for using multiple pages with parameters
  type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "LaunchList"
  >;
  const navigation = useNavigation<NavigationProp>();

  const handleViewCharacter = (id: number) => {
    navigation.navigate("Character", { id }); // Pass only the id
  };

  // return a card for each character with their image, name, and info
  return (
    <Fragment>
    <Navbar />
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        {data.characters.results.map((char: any) => (
          <View key={char.id} style={styles.card}>
            <Image source={{ uri: char.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{char.name}</Text>
              <Text style={styles.info}>
                {char.status} - {char.species}
              </Text>{" "}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleViewCharacter(char.id)}
            >
              <Text>View</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
    </Fragment>
  );
}

// list of styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "stretch",
    width: "27%",
    display: "flex",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
  },
  textContainer: {
    flexShrink: 1,
    flexDirection: "column",
    padding: 16,
    alignItems: "stretch",
  },
  name: {
    color: "#3ec7e6",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  info: {
    color: "#97ce4c",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#97ce4c",
    borderRadius: 8,
    padding: 10,
    height: "45%",
    alignItems: "flex-end",
    fontFamily: "Shwifty",
    marginTop: 20,
    right: 20,
    position: "absolute",
  },
  screen: {
    flex: 1,
    backgroundColor: "#3ec7e6",
  },
});
