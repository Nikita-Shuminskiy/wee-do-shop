import React, { useEffect, useRef } from 'react'
import {Dimensions, StyleSheet} from 'react-native'
import { Modalize } from 'react-native-modalize'

type ModalPopupProps = {
	visible: boolean
	onClose: () => void
	style?: any
	children: JSX.Element
}
const ModalPopup = ({ visible, onClose, children, style }: ModalPopupProps) => {
	const modalizeRef = useRef(null)

	useEffect(() => {
		if (visible) {
			modalizeRef.current?.open()
		} else {
			modalizeRef.current?.close()
		}
	}, [visible])

	return (
		<Modalize
			modalHeight={Dimensions.get('window').height - 100}
			avoidKeyboardLikeIOS={true}
			childrenStyle={{ ...styles.modalContent, ...style }}
			ref={modalizeRef}
			onClosed={onClose}
		>
			{children}
		</Modalize>
	)
}

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
})

export default ModalPopup;
