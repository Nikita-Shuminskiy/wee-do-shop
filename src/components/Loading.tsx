import React from 'react'
import {Modal} from "react-native";

const Loading = ({ visible }) => {
    return (
        <Modal visible={visible}>
            {/*<HStack space={2} justifyContent={'center'}>
                <Spinner accessibilityLabel={'Loading posts'} size={'lg'} color={'warning.500'} />
                <Heading color={'white'} fontSize={'md'}>
                    Loading
                </Heading>
            </HStack>*/}
        </Modal>
    )
}
export default Loading