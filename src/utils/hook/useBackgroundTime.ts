import {useEffect, useState} from "react"
import {deviceStorage} from "../storage/storage"
import * as Updates from "expo-updates"
import {AppState} from "react-native"
type useBackgroundTimeProps = {
	backgroundHandler: (time: number) => void
}
export const useBackgroundTime = ({backgroundHandler}: useBackgroundTimeProps) => {
	const handleAppStateChange = async (nextAppState) => {
		if (nextAppState === "background") {
			// Пользователь перешел в фоновый режим, начнем отслеживать время
			const timeBackground = new Date().getTime()
			await deviceStorage.saveItem("timeBackground", JSON.stringify(timeBackground))
		} else if (nextAppState === "active") {
			const timeBackground = await deviceStorage.getItem("timeBackground")
			const timeActive = new Date().getTime()
			if (!timeBackground) {
				await deviceStorage.removeItem("timeBackground")
				return
			}
			let elapsedMinutes = Math.floor((timeActive - Number(timeBackground)) / 60000) // Преобразовать миллисекунды в минуты
			backgroundHandler(elapsedMinutes)
			elapsedMinutes = 0
			await deviceStorage.removeItem("timeBackground")
		}
	}
	useEffect(() => {
		const appStateSubscription = AppState.addEventListener("change", handleAppStateChange)
		return () => {
			appStateSubscription.remove()
		}
	}, [])
}
