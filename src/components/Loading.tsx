import React, {memo, useEffect, useRef} from 'react'
import {Animated, ImageBackground, Modal, StyleSheet} from 'react-native'
import logo from '../assets/images/logo-loading.png'
import logoBorder from '../assets/images/border-logo.png'
import {Box} from 'native-base'
import {BlurView} from 'expo-blur'


const Loading = memo(({visible}: any) => {
    const rotateAnim = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 11000,
                useNativeDriver: true,
            }),
        ).start()
    }, [rotateAnim])

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

    return (
        <Modal style={{ backgroundColor: 'rgba(255, 0, 0, 0,2)' }} animationType={'fade'} transparent={true} visible={visible} >
          {/*  <BlurView intensity={10} tint="light" style={StyleSheet.absoluteFillObject} />*/}
            <Box style={[StyleSheet.absoluteFillObject, styles.blurBackground]}/>
            <Box flex={1}  backgroundColor={'transparent'} justifyContent={'center'} alignItems={'center'}>
                <ImageBackground   style={[styles.imgLogo]} source={logo}>
                    <Animated.Image
                        style={{
                            width: 92,
                            height: 92,
                            transform: [{rotate: rotateInterpolate}],
                        }}
                        source={logoBorder}
                    />
                </ImageBackground>
            </Box>
        </Modal>
    )
})
const styles = StyleSheet.create({
    imgLogo: {
        alignItems: 'center', justifyContent: 'center', width: 60,
        height: 57,
    },
    blurBackground: {
        backgroundColor: 'rgba(255,255,255,0.32)',
        backdropFilter: 10,
    },
    blurContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,253,253,0.5)',
    },
})
export default Loading
