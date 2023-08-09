import {FlatList} from "react-native";


export const VirtualizedList = ({ children }) => {
	return <FlatList data={[]}  style={{ flex: 1, width: '100%' }} renderItem={null} ListHeaderComponent={<>{children}</>} />
}
