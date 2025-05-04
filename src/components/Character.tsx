import React, { useEffect, useState } from 'react'
import { View, Text, Image } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

const Character = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Character">>();
  const { id } = route.params;
  const [character, setCharacter] = useState<any>(null); 

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        setCharacter(data);
      } catch (err) {
        console.error("Failed to fetch character:", err);
      } 
    };

    fetchCharacter();
  }, [id]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 28 }}>{character.name}</Text>
      <Image source={{ uri: character.image }} style={{ width: 150, height: 150 }} />
      <Text>Status: {character.status}</Text>
      <Text>Species: {character.species}</Text>
    </View>
  );
};

export default Character;