import React, { memo } from "react";
import { ImageStyle, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import search from '../assets/images/search.png'
import {Image} from "native-base";
import {colors} from "../assets/colors/colors";
import { useTranslation } from "react-i18next";

type AddressAutocompleteProps = {
    onSave: (data: AutoCompleteDataType) => void
}
export type AutoCompleteDataType = {
    location: { latitude: number, longitude: number },
    positionMarker: { latitude: number, longitude: number },
    address: {name: string, formatted_address: string}
}
const AddressAutocomplete = ({onSave}: AddressAutocompleteProps) => {
    const {t} = useTranslation(['map']);
    return (
        <GooglePlacesAutocomplete
            enablePoweredByContainer={false}
            renderLeftButton={() => <Image w={17} h={17} ml={2} alt={'search'} source={search}/>}
            styles={styles}
            fetchDetails={true}
            placeholder={t('enterAnAddress')}
            onPress={(data, details = null) => {
                const { geometry, name, formatted_address  } = details;
                if (geometry && geometry.location) {
                    const { lat, lng } = geometry.location;
                    onSave({
                        location: { latitude: lat, longitude: lng },
                        positionMarker: { latitude: lat, longitude: lng },
                        address: {name, formatted_address}
                    })
                }

            }}
            debounce={200}
            query={{
                key: 'AIzaSyCDu3dMvEFIDgw_uqJWabVuauq0JVsu3NI',
                language: 'en',
            }}
        />
    );
};
const styles = StyleSheet.create({
    textInputContainer:{
        padding: 10,
        marginBottom: 3,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        zIndex:999,
        width:'90%',
        height: 50
    },
    textInput: {
        marginTop: 5,
        height: 50,
        color: colors.black,
        fontSize: 16,
    },
    listView:{
        color: 'black',
        width:'89%',
    },
    description:{
        fontSize:15,
        fontWeight: '500',
    },
})
export default memo(AddressAutocomplete);
