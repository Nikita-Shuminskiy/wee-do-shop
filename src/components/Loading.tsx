import React, {memo, useEffect, useLayoutEffect, useRef, useState} from 'react'
import {Animated, ImageBackground, StyleSheet, Modal} from 'react-native'
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
           {/* <BlurView intensity={10} tint="light" style={StyleSheet.absoluteFillObject} />*/}
            <Box flex={1}   justifyContent={'center'} alignItems={'center'}>
                <ImageBackground  style={styles.imgLogo} source={logo}>
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
    blurContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,253,253,0.5)', // Подобрать цвет и уровень прозрачности по вашему выбору
    },
})
export default Loading
