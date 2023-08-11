import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

const CameraComponent = () => {
    const [hasCameraPermission, setCameraPermission] = useState(null);
    // @ts-ignore
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [capturedImage, setCapturedImage] = useState(null);

    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            setCameraPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setCapturedImage(photo);
        }
    };

    if (hasCameraPermission === null) {
        return <View />;
    }
    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera
                style={{ flex: 1 }}
                type={type}
                ref={cameraRef}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button
                        title="Take Picture"
                        onPress={takePicture}
                    />
                </View>
            </Camera>
            {capturedImage && (
                <View style={{ flex: 1 }}>
                    <Image
                        source={{ uri: capturedImage.uri }}
                        style={{ flex: 1 }}
                    />
                </View>
            )}
        </View>
    );
};

export default CameraComponent;
