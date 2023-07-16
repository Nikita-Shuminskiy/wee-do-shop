import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import AddressAutocomplete, {AutoCompleteDataType} from "../../components/AddressAutocomplete";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {MapViews} from "../../components/MapViews";
import {Box, Text} from "native-base";
import ArrowBack from "../../components/ArrowBack";

type GoogleAutocompleteMapSProps = {
    navigation: NavigationProp<ParamListBase>
}

const GoogleAutocompleteMapS = ({navigation}: GoogleAutocompleteMapSProps) => {
    const [showLocationMap, setShowLocationMap] = useState(false)
    const [location, setLocation] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [currentAddress, setCurrentAddress] = useState(null);
    const goBackPress = () => {
        navigation.goBack()
    }

    const onSaveAutoCompleteHandler = (data: AutoCompleteDataType) => {
        setLocation(data.location)
        setMarkerPosition(data.positionMarker)
        setCurrentAddress(data.address)
        setShowLocationMap(true)
    }
    return (
        <>
            <BaseWrapperComponent isKeyboardAwareScrollView={false}>
                <Box w={'100%'} alignItems={'center'} mb={10} justifyContent={'space-between'} flexDirection={'row'}>
                    <ArrowBack styleTouchable={{flex: 2, marginLeft: 10}} goBackPress={goBackPress}/>
                    <Text flexGrow={2} fontSize={28} fontWeight={'700'}>Enter the address</Text>
                </Box>
                <Box alignItems={'center'} flex={1} w={'100%'}>
                    <AddressAutocomplete onSave={onSaveAutoCompleteHandler}/>
                </Box>
            </BaseWrapperComponent>
            {showLocationMap &&
                <MapViews currentDataMap={{location: location, positionMarker: markerPosition, address: currentAddress}}
                          close={() => setShowLocationMap(false)} visible={showLocationMap}/>}
        </>
    );
};

export default GoogleAutocompleteMapS;
