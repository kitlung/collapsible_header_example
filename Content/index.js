import React, { useEffect, useState } from "react";
import { Animated, FlatList, View, Text } from "react-native";
import styles from "./styles";

const Item = ({ text }) => {
  return (
    <View style={styles.item}>
      <Text>{text}</Text>
    </View>
  );
};

const Content = ({ panResponder }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateData());
  }, []);

  const generateData = () => {
    return [...Array(100)].map((ele, index) => ({
      id: index.toString(),
      text: `element : ${index}`,
    }));
  };

  const renderItem = (item) => {
    return <Item text={item.item.text} />;
  };

  return (
    <Animated.FlatList
      {...panResponder.panHandlers}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default Content;
