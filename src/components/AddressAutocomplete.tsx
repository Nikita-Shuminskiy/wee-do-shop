import React, { useState } from 'react';
import {StyleSheet, View} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import search from '../assets/images/search.png'
import {Image} from "native-base";
import {colors} from "../assets/colors/colors";
type AddressAutocompleteProps = {
    onSave: (data: AutoCompleteDataType) => void
}
export type AutoCompleteDataType = {
    location: { latitude: number, longitude: number },
    positionMarker: { latitude: number, longitude: number },
    address: {name: string, formatted_address: string}
}
const AddressAutocomplete = ({onSave}: AddressAutocompleteProps) => {
    return (
        <GooglePlacesAutocomplete
            enablePoweredByContainer={false}
            renderLeftButton={() => <Image w={17} h={17} ml={2} alt={'search'} source={search}/>}
            styles={styles}
            fetchDetails={true}
            placeholder={'Enter an address'}
            /*currentLocation={true}
            currentLocationLabel="Current Location"*/
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
            onNotFound={() => {
                console.log(1)
            }}
            debounce={200}
            query={{
                key: 'AIzaSyC-Zb10nysj6jYlw_rMIptMyWYOe82GmMM',
                language: 'en', // Язык результатов автокомплита
            }}
        />
    );
};

const styles = StyleSheet.create({
    row: {
        backgroundColor: 'transparent',
    },
    textInputContainer:{
        padding: 10,
        backgroundColor: colors.blueLight,
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
        color: colors.gray,
        fontSize: 16,
        backgroundColor: 'transparent',
        zIndex:999,
    },
    predefinedPlacesDescription: {
        color: colors.gray,
        backgroundColor:"transparent",
    },
    listView:{
        color: 'black',
        backgroundColor:"transparent",
        width:'89%',
    },
    separator:{
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
    },
    description:{
        flexDirection:"row",
        flexWrap:"wrap",
        fontSize:18,
        fontWeight: '500',
        maxWidth:'89%',
    },
})
export default AddressAutocomplete;
