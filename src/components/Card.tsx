import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

interface CardProps {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  onClick: (id: number) => void;
}

const Card = (props: CardProps) => {
  return (
    <View key={props.id} style={styles.card}>
      <Image source={{ uri: props.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.info}>
          {props.status} - {props.species}
        </Text>{" "}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.onClick(props.id)}
      >
        <Text>View</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
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
    fontFamily: "Schwifty",
    marginTop: 20,
    right: 20,
    position: "absolute",
  },
});
