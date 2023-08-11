import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image} from 'react-native';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import {Box} from "native-base";
import Button from "./Button";

const CameraComponent = () => {
    const [hasCameraPermission, setCameraPermission] = useState(null);
    // @ts-ignore
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false); // Добавляем состояние для открытия/закрытия камеры

    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const {status} = await Permissions.askAsync(Permissions.CAMERA);
            setCameraPermission(status === 'granted');
        })();
    }, []);

    const openCamera = () => {
        setIsCameraOpen(true);
    };

    const closeCamera = () => {
        setIsCameraOpen(false);
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setCapturedImage(photo);
            closeCamera(); // Закрываем камеру после сделанной фотографии
        }
    };

    if (hasCameraPermission === null) {
        return <View/>;
    }
    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{flex: 1}}>
            {isCameraOpen ? (
                <Camera
                    style={{position: 'absolute', top: 0, width: '100%', bottom: 0}}
                    type={type}
                    ref={cameraRef}
                >
                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Button
                            title="Take Picture"
                            onPress={takePicture}
                        />
                    </View>
                </Camera>
            ) : capturedImage ? ( // Если есть сделанная фотография
                <View style={{flex: 1}}>
                    <Image
                        source={{uri: capturedImage?.uri}}
                        style={{flex: 1}}
                    />
                    <Button title="Open Camera" onPress={openCamera}/>
                </View>
            ) : ( // Если нет ни открытой камеры, ни сделанной фотографии
                <View style={{flex: 1}}>
                    <Button title="Open Camera" onPress={openCamera}/>
                </View>
            )}
        </View>
    );
};

export default CameraComponent;
