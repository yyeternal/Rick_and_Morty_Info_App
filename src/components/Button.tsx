import React from "react";
import { StyleSheet } from "react-native";

interface Props {
    id: Number; 
}

const Button = ({id} : Props) => {
  return (
    <button style={styles.button}>
        View
    </button>
)};

export default Button;

const styles = StyleSheet.create({
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
});
