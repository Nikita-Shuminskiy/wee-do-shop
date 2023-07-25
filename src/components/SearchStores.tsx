import React, {useEffect, useState} from 'react';
import {colors} from "../assets/colors/colors";
import {Box, Image} from "native-base";
import TextInput from "./TextInput";
import searchImg from "../assets/images/search.png";
import settingImg from "../assets/images/setting.png";
import rootStore from "../store/RootStore/root-store";

const SearchStores = () => {
    const {StoresService} = rootStore
    const [search, setSearch] = useState('')

    const handleTextChange = (newText) => {
        setSearch(newText);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            StoresService.searchStores(search)
        }, 600);

        return () => clearTimeout(timer);
    }, [search]);
    return (
        <Box w={'100%'} paddingX={5}>
            <TextInput
                iconLeft={<Image ml={2} source={searchImg} alt={'search'}/>}
                iconRight={
                    <Box flexDirection={'row'} mr={2}>
                        <Box borderRightWidth={1} borderColor={colors.gray} mr={4}/>
                        <Image source={settingImg} alt={'setting'}/>
                    </Box>
                }
                h={50}
                placeholder={'Name, strain or shop'}
                borderRadius={16}
                backgroundColor={'transparent'}
                borderColor={colors.grayLight}
                value={search}
                onChangeText={handleTextChange}/>
        </Box>
    );
};

export default SearchStores;
