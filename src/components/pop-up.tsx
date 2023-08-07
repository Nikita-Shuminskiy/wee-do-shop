import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, useWindowDimensions} from 'react-native';
import {Modalize} from 'react-native-modalize';
type ModalPopupProps = {
    visible: boolean
    onClose: () =>void
    style: any
    children: any
}
const ModalPopup = ({visible, onClose, children, style}: ModalPopupProps) => {
    const modalizeRef = useRef(null);
    const {height} = useWindowDimensions();

    useEffect(() => {
        if (visible) {
            modalizeRef.current?.open();
        } else {
            modalizeRef.current?.close();
        }
    }, [visible]);

    return (
        <Modalize
            childrenStyle={{...styles.modalContent, ...style}}
            ref={modalizeRef}
            onClosed={onClose}
        >
            {children}
        </Modalize>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default ModalPopup;
