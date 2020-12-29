import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Animated,
  PanResponder,
} from "react-native";

import {
  HIDE_HEADER_POINT,
  MIN_HEADER_HEIGHT,
  MAX_HEADER_HEIGHT,
} from "./theme";

import CollapsibleHeader from "./CollapsibleHeader";
import Content from "./Content";

const App = () => {
  // storing the last pan.dy value
  const [prevPanValue, setPrevPanValue] = useState(HIDE_HEADER_POINT);
  // the reference of the state
  const prePanValueRef = useRef(prevPanValue);
  // value for Animated event
  const pan = useRef(new Animated.ValueXY()).current;

  const headerHeight = pan.y.interpolate({
    inputRange: [-HIDE_HEADER_POINT, HIDE_HEADER_POINT],
    outputRange: [MIN_HEADER_HEIGHT, MAX_HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  useEffect(() => {
    // when the state update, update the reference as well
    prePanValueRef.current = prevPanValue;
  }, [prevPanValue]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        let yOffset = 0;
        console.log("==== grant");
        // set pan offset here
        // make sure the header height remain the same as before
        if (prePanValueRef.current <= -HIDE_HEADER_POINT) {
          yOffset = -HIDE_HEADER_POINT;
        } else if (prePanValueRef.current >= HIDE_HEADER_POINT) {
          yOffset = HIDE_HEADER_POINT;
        } else if (
          prePanValueRef.current > -HIDE_HEADER_POINT &&
          prePanValueRef.current < HIDE_HEADER_POINT
        ) {
          yOffset = pan.y._value;
        }

        pan.setOffset({
          x: 0,
          y: yOffset,
        });
        // reset pan value
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (event, gestureState) => {
        // store the dy value as state
        setPrevPanValue(gestureState.dy);
      },
    })
  ).current;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <Animated.View height={headerHeight}>
          <CollapsibleHeader panY={pan.y} />
        </Animated.View>
        <View style={{ flex: 1 }}>
          <Content panResponder={panResponder} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
