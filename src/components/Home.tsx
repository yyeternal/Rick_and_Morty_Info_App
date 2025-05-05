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
import Card  from "./Card"
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
    navigation.navigate("Character", { id }); 
  };

  // return a card for each character with their image, name, and info
  return (
    <ScrollView>
      <Navbar />
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.container}>
          {data.characters.results.map((char: any) => (
            <Card id={char.id} image={char.image} name={char.name} status={char.status} species={char.species} onClick={handleViewCharacter}/>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
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
  screen: {
    flex: 1,
    backgroundColor: "#3ec7e6",
  },
});
