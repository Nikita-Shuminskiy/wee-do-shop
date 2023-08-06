import React from 'react';
import {Box} from "native-base";
import {colors} from "../assets/colors/colors";
import {StatusType} from "../api/ordersApi";
import {Feather, FontAwesome, MaterialIcons} from "@expo/vector-icons";
const renderStatusIco = (index, color: string, status: StatusType) => {
    switch (index) {
        case 1:
            return <MaterialIcons name="done" size={24}
                                  color={color}/>
        case 2:
            return <Feather name="box" size={24}
                            color={color}/>
        case 3:
            return <Feather name="box" size={24}
                            color={color}/>
        case 4:
            return <FontAwesome name="motorcycle" size={24}
                                color={color}/>
        case 5:
            return <MaterialIcons name="outlined-flag" size={24}
                                  color={color}/>
        default:
            return <MaterialIcons name="outlined-flag" size={24} color={color}/>
    }
}
const getCurrentBackgroundFillScale = (status: StatusType, index: number, activeColor: string, defaultColor: string, from: 'background' | 'ico-color') => {
    if (index === statusOrder[status]) {
        return activeColor;
    } else if (index < statusOrder[status]) {
        return from === 'background' ? colors.grayWhite : colors.gray
    } else {
        return defaultColor;
    }
};
const statusOrder = {
    [StatusType.Placed]: 1,
    [StatusType.Confirmed]: 2,
    [StatusType.WaitingForPickUp]: 3,
    [StatusType.OnTheWay]: 4,
    [StatusType.Completed]: 5,
};

type OrderStatusBarType = {
    status: StatusType
}

const OrderStatusBar = ({status}: OrderStatusBarType) => {
    return <>
        {
            [1, 2, 3, 4, 5].map((el) => {
                return <Box key={el} w={60} h={60} ml={2} mr={2} flexDirection={'row'} alignItems={'center'}>
                    <Box w={60} h={60} borderWidth={2}
                         alignItems={'center'}
                         backgroundColor={getCurrentBackgroundFillScale(status, el, colors.green, colors.white, 'background')}
                         justifyContent={'center'}
                         borderColor={colors.grayWhite} borderRadius={50}>
                        {renderStatusIco(el, getCurrentBackgroundFillScale(status, el, colors.white, colors.green, 'ico-color'), status)}
                    </Box>
                    {
                        el !== 5 && <Box borderBottomWidth={2} w={3} borderColor={colors.grayWhite}/>
                    }
                </Box>
            })
        }
    </>

};

export default OrderStatusBar;
