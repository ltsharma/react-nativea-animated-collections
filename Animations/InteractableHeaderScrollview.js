/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  PanResponder,
  Dimensions,
  // Easing,
  Button,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  Value,
  event,
  useCode,
  set,
  block,
  cond,
  eq,
  greaterOrEq,
  timing,
  Easing,
} from 'react-native-reanimated';
// const {Value, event, } = Animated;
export default () => {
  const scrollY = new Value(0);
  const scrollTranslate = new Value(0);
  const imgPosition = scrollY.interpolate({
    inputRange: [0, 240],
    outputRange: [350, 120],
    extrapolate: 'clamp',
  });

  const overlayOpacity = scrollY.interpolate({
    inputRange: [0, 1, 240],
    outputRange: [0, 0.3, 0.5],
    extrapolate: 'clamp',
  });

  const imageElm = (
    <Animated.View
      style={[
        {
          height: imgPosition,
          width: '100%',
          position: 'absolute',
          top: 0,
          overflow: 'hidden',
        },
      ]}>
      <Animated.View
        pointerEvents={'none'}
        style={{
          height: 100,
          borderRadius: 15,
          width: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          top: -15,
          zIndex: 10,
          transform: [{translateY: imgPosition}],
        }}
      />
      <Animated.View
        pointerEvents={'none'}
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: '#000000',
          zIndex: 1,
          opacity: overlayOpacity,
        }}>
        {/* <linearGradient /> */}
      </Animated.View>
      <ImageBackground
        source={{
          uri:
            'https://res.cloudinary.com/dsieaglmz/image/upload/v1592095978/ccavawhbykdnd5593y02.jpg',
        }}
        style={{height: 350, width: '100%'}}>
        <TouchableOpacity
          style={{marginTop: 200}}
          onPress={() => console.log('12312312312312')}>
          <Text>TOUCHED</Text>
        </TouchableOpacity>
      </ImageBackground>
    </Animated.View>
  );
  const dummy = Array(100).fill(0);
  return (
    <View style={{flex: 1}}>
      <Animated.ScrollView
        pointerEvents="box-none"
        style={{
          marginTop: 120,
          backgroundColor: 'transparent',
        }}
        bounces={false}
        scrollEventThrottle={1}
        onScroll={event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
          useNativeDriver: true,
        })}>
        <Animated.View pointerEvents={'none'} style={{height: 350 - 120}} />
        <Animated.View style={{}}>
          {dummy.map((s, i) => (
            <Text>{i}</Text>
          ))}
        </Animated.View>
      </Animated.ScrollView>
      {imageElm}
      <View
        style={{
          height: 120,
          width: '100%',
          backgroundColor: 'transparent',
          justifyContent: 'flex-end',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          // zIndex: 50,
          // elevation: 50,
          flexDirection: 'row',
        }}>
        <Text>Header</Text>
        <Button onPress={() => console.log('H pressed')} title="press" />
      </View>
    </View>
  );
};
