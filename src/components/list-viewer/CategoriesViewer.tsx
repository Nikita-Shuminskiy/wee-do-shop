import React from 'react';
import {Box, Text, Pressable} from "native-base";
import {colors} from "../../assets/colors/colors";
import {LinearGradient} from "expo-linear-gradient";

const CategoriesViewer = ({data}) => {
    return (
        <Pressable justifyContent={'center'}  alignItems={'center'} mb={1}>
          {/*  <LinearGradient
                colors={['#FFFFFF', '#E1E1E1']}>

            </LinearGradient>*/}
            <Box borderRadius={16} w={76} h={77} alignItems={'center'} justifyContent={'center'} m={1}
                 borderWidth={1} borderColor={colors.green}>
                <Text fontSize={14} fontWeight={'600'} color={colors.green}>{data.name}</Text>
            </Box>
        </Pressable>
    );
};

export default CategoriesViewer;
