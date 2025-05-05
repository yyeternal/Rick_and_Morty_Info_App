import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Navbar from "./navbar";


const Character = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Character">>();
  const { id } = route.params;
  const [character, setCharacter] = useState<any>(null);

  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterAndEpisodes = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        const data = await response.json();
        setCharacter(data);

        if (!data.episode || data.episode.length === 0) {
          setEpisodes([]);
          setLoading(false);
          return;
        }

        // Extract episode IDs from URLs
        const episodeIds = data.episode.map((url: string) =>
          url.split("/").pop()
        );
        const episodesUrl = `https://rickandmortyapi.com/api/episode/${episodeIds.join(
          ","
        )}`;
        const episodesResponse = await fetch(episodesUrl);
        const episodesData = await episodesResponse.json();

        // Ensure episodes is always an array
        const episodesArray = Array.isArray(episodesData)
          ? episodesData
          : [episodesData];
        setEpisodes(episodesArray);

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch character or episodes:", err);
        setLoading(false);
      }
    };

    fetchCharacterAndEpisodes();
  }, [id]);

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" color="green" />
        <Text>Loading character info...</Text>
      </View>
    );
  }

  if (!character) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Failed to load character.</Text>
      </View>
    );
  }

  type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Character"
  >;
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView style={{backgroundColor: "#3ec7e6"}}>
      <Navbar />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginBottom: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.nameCard}>{character.name}</Text>
          <Image
            source={{ uri: character.image }}
            style={{ width: 250, height: 250 }}
          />
          <Text style={styles.cardText}>Status: {character.status}</Text>
          <Text style={styles.cardText}>Species: {character.species}</Text>
          <Text style={styles.cardText}>Gender: {character.gender}</Text>
          <Text style={styles.cardText}>
            Location: {character.location.name}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.episodeText}>Episodes:</Text>
          {episodes.length === 0 ? (
            <Text style={styles.cardText}>This character does not appear in any episodes.</Text>
          ) : (
            episodes.map((ep) => (
              <Text style={styles.episodeText} key={ep.id}>
                {ep.episode}: {ep.name}
              </Text>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Character;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3ec7e6",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "column",
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 10,
    marginBottom: 24,
    marginTop: 24,
    marginRight: 24,
    alignItems: "stretch",
    width: "46%",
    display: "flex",
  },
  nameCard: {
    color: "#97ce4c",
    fontSize: 28,
    textShadowColor: "#3ec7e6",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    fontFamily: "Schwifty",
  },
  cardText: {
    color: "#97ce4c",
    fontSize: 28,
    textShadowColor: "#3ec7e6",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  episodeText: {
    color: "#97ce4c",
    fontSize: 16,
    textShadowColor: "#3ec7e6",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  }
});
