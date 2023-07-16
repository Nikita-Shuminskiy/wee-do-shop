import React from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, View } from 'react-native'
import { Box } from 'native-base'

const MapViews = () => {
	return <Box style={styles.container}>
		<MapView style={styles.map} />
	</Box>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: '100%',
		height: '100%',
	},
})
