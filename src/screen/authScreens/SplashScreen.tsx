import React, { memo, useEffect, useState } from "react";
import {colors} from "../../assets/colors/colors"
import rootStore from "../../store/RootStore/root-store"
import splashScreenImg from "../../../assets/splash.png"
import {Animated, Easing, Image, StyleSheet} from "react-native"

const SplashScreen = () => {
  const {AuthStoreService} = rootStore
  useEffect(() => {
    AuthStoreService.getMe()
  }, []);
  const [bounceValue] = useState(new Animated.Value(1));


  useEffect(() => {
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 0,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1500,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    bounceAnimation.start();
  }, []);
  return (
    <Animated.View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
      }}
    >
      <Animated.Image
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          transform: [{ scale: bounceValue }],
        }}
        source={splashScreenImg}
      />
    </Animated.View>
  );
}

export default memo(SplashScreen)
