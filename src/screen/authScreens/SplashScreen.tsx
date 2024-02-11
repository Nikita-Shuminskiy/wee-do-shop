import React, {memo, useEffect} from "react"
import {Box} from "native-base"
import {colors} from "../../assets/colors/colors"
import rootStore from "../../store/RootStore/root-store"
import splashScreenImg from "../../../assets/splash.png"
import {Image, StyleSheet} from "react-native"

const SplashScreen = () => {
  const {AuthStoreService} = rootStore
  useEffect(() => {
    AuthStoreService.getMe()
  }, []);
  return (
    <Box flex={1} w={'100%'} h={'100%'} backgroundColor={colors.white}>
      <Image style={{ flex: 1, width: '100%', height: '100%' }} source={splashScreenImg} />
    </Box>
  );
}
const styles = StyleSheet.create({
 
});

export default memo(SplashScreen)