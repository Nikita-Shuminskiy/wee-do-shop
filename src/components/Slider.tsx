import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import {colors} from "../assets/colors/colors";

type SliderComponentProps = {
    onChangeValue: (value: number) => void
    valueSlider: number
}
const SliderComponent = ({onChangeValue, valueSlider}: SliderComponentProps) => {
    const [sliderValue, setSliderValue] = useState(valueSlider);

    const handleSliderChange = (value) => {
        setSliderValue(value);
        onChangeValue(sliderValue)
    };


    return (
        <Slider
            value={sliderValue}
            onValueChange={handleSliderChange}
            minimumValue={0}
            maximumValue={100}
            step={1}
            style={{width: '100%'}}
            thumbTintColor={colors.green}
            minimumTrackTintColor={colors.green}
        />
    );
};

const styles = StyleSheet.create({});

export default SliderComponent;
