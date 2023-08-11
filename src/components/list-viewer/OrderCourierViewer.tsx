import React from 'react';
import {StyleSheet} from "react-native";
import {Box, Text} from "native-base";
import {formatProductPrice} from "../MapViews/utils";
import {colors} from "../../assets/colors/colors";
import {getFormatDateToString} from "../../utils/utils";
import Button from "../Button";
import {useNavigation} from "@react-navigation/native";
import {routerConstants} from "../../constants/routerConstants";

type OrderCourierProps = {
    order: any
}
const OrderCourierViewer = ({order}: OrderCourierProps) => {
    const navigation = useNavigation<any>()

    const onPressHide = () => {

    }
    const onPressTakeOrder = () => {
        navigation.navigate(routerConstants.COURIER_PICK_ORDER)
    }

    return (<Box style={styles.container}>
            <Box flexDirection={'row'} justifyContent={'space-between'}>
                <Text fontWeight={'600'} maxW={300} fontSize={16}>89 Soi Lam Promtep 2, Rawai
                    469, 3 Wiset Rd, Rawai</Text>
                <Text fontWeight={'600'} fontSize={16}>฿8888</Text>
            </Box>

            <Box flexDirection={'row'} mt={2} justifyContent={'space-between'}>
                <Button backgroundColor={colors.green} styleText={styles.textBtn}
                        styleContainer={styles.containerBtn}
                        onPress={onPressTakeOrder} title={'Take order'}/>
                <Button backgroundColor={colors.grayLight} styleText={{color: colors.black}}
                        styleContainer={{width: 20}}
                        onPress={onPressHide}
                        title={'Hide'}/>
            </Box>
        </Box>
    );
};
const styles = StyleSheet.create({
    textBtn: {
        color: colors.white
    },
    containerBtn: {
        flex: 1,
        width: '100%',
        marginRight: 5
    },
    container: {
        borderRadius: 20,
        marginBottom: 15,
        margin: 10,
        padding: 10,
        backgroundColor: colors.white,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 18,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10.00,
        elevation: 10,
    }
})
export default OrderCourierViewer;
