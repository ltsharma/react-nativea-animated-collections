import {useEffect, useRef, useCallback} from 'react';
import {Animated, Easing, Dimensions} from 'react-native';

const {height: DEVICE_HEIGHT} = Dimensions.get('window');

const useCardAnimation = (
  number = 1,
  {
    delay = 0,
    consequestDelay = 50,
    friction = 8,
    duration = 50,
    fromValue = DEVICE_HEIGHT,
    toValue = 0,
    showIntial = true,
    easing = Easing.inOut(Easing.ease),
  },
) => {
  const animatedNode = useRef(
    new Array(number).fill(0).map(() => new Animated.Value(fromValue)),
  ).current;

  useEffect(() => {
    showCards(showIntial);
  }, []);

  const showCards = useCallback(
    (type) => {
      const animations = animatedNode.map((elm, index) =>
        Animated.spring(animatedNode[index], {
          toValue: type ? toValue : fromValue,
          duration,
          delay: delay + consequestDelay * index,
          friction,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      );
      Animated.parallel(animations).start();
    },
    [
      animatedNode,
      consequestDelay,
      delay,
      duration,
      friction,
      fromValue,
      toValue,
    ],
  );

  return [
    animatedNode.map((translateY) => ({
      transform: [{translateY}],
    })),
    showCards,
  ];
};

export default useCardAnimation;
