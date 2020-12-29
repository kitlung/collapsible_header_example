import { StyleSheet } from "react-native";
import {
  HIDE_HEADER_POINT,
  MIN_HEADER_HEIGHT,
  MAX_HEADER_HEIGHT,
} from "../theme";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "red",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 36,
  },
});

export default styles;
