import React from "react";
import { View, Text, Animated } from "react-native";
import styles from "./styles";

import { HIDE_HEADER_POINT } from "../theme";

const CollapsibleHeader = ({ panY }) => {
  const opacity = panY.interpolate({
    inputRange: [-HIDE_HEADER_POINT, HIDE_HEADER_POINT],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.header}>
      <Animated.View opacity={opacity}>
        <Text style={styles.title}>CollapsibleHeader</Text>
      </Animated.View>
    </View>
  );
};

export default CollapsibleHeader;
