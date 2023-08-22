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
		}
	}, [visible])

	return (
		<Modalize
			modalHeight={Math.round(Dimensions.get('window').height * 0.8)}
			avoidKeyboardLikeIOS={true}
			childrenStyle={{ ...styles.modalContent, ...style }}
			ref={modalizeRef}
			onClosed={() => {
				if(visible) {
					modalizeRef.current?.close()
				}
				onClose()
			}}
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
