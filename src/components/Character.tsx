import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

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

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 28 }}>{character.name}</Text>
        <Image
          source={{ uri: character.image }}
          style={{ width: 150, height: 150 }}
        />
        <Text>Status: {character.status}</Text>
        <Text>Species: {character.species}</Text>
        <Text>Gender: {character.gender}</Text>
        <Text>Location: {character.location.name}</Text>
        <Text>Episodes:</Text>
        {episodes.length === 0 ? (
          <Text>This character does not appear in any episodes.</Text>
        ) : (
          episodes.map((ep) => (
            <Text key={ep.id}>
              {ep.episode}: {ep.name}
            </Text>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Character;
