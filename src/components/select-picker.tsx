import React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { Center, CheckIcon, FormControl, Select, WarningOutlineIcon } from 'native-base'
import { colors } from "../assets/colors/colors";

type SelectPickerProps<T> = {
	values?: string
	onValueChange: (e: string) => void
	onBlur?: (e: any) => void
	arrItem: Array<T & { id?: string; value?: string; _id?: string; name?: string, enKey?:string }>
	defaultLabel?: string
	label?: string
	isInvalid?: boolean
	textErrorStyles?: StyleProp<TextStyle>
	onReturnValueId?: boolean
	isRequired?: boolean
	errorMessage?: string
	labelEmpty?: string
	translations?: any
	mt?: number
}
/*type ListProps<T> = {
    items: T[]
    renderItem: (item: T, index: number) => ReactNode
    className?: string
}

export const List: <T>(props: ListProps<T>) => ReactElement<ListProps<T>> = ({
                                                                                 items,
                                                                                 renderItem,
                                                                                 className
                                                                             }) => <Box>{items.map(renderItem)}</Box>
<List items={messages}
      className={classes.messages_content}
      renderItem={(message, i) => <ChatMessageItem
          key={message + '-' + i}
          message={message} />}
/>*/
const SelectPicker = function <T>({
	arrItem,
	defaultLabel,
	values,
	onBlur,
	label,
	isInvalid,
	textErrorStyles,
	isRequired,
	onReturnValueId,
	onValueChange,
	errorMessage,
    translations,
	mt=2,
	labelEmpty,
	...rest
}: SelectPickerProps<T>) {
	return (
		<Center  mt={mt} w={'100%'}>
			<FormControl isReadOnly isRequired={isRequired} isInvalid={isInvalid}>
				<FormControl.Label isReadOnly _text={{
					color: colors.gray
				}} >{label}</FormControl.Label>
				<Select
					{...rest}
					_actionSheetContent={{
						backgroundColor: 'gray.200'
					}}
					onValueChange={onValueChange}
					placeholder={defaultLabel}
					pointerEvents={'box-only'}
					selectedValue={values}
					placeholderTextColor={colors.gray}
					color={colors.black}
					borderRadius={12}
					h={10}
					width={'100%'}
					variant={'outline'}
					_selectedItem={{
						bg: 'gray.200',
						endIcon: <CheckIcon size="5" />,
					}}
					mt={1}
					onTouchCancel={onBlur}
				>
					{arrItem.length ? (
						arrItem.map((list, index) => {
							const currentValue = list.name
							const currentId = list.value
							return (
								<Select.Item
									key={index}
									backgroundColor={'transparent'}
									mb={1}
									borderRadius={12}
									_text={{
										color: list.id === 'add' ? colors.orange : colors.black
									}}
									label={currentValue}
									value={onReturnValueId ? currentId : currentValue}
								/>
							)
						})
					) : (
						<Select.Item key={1} color={colors.gray} label={labelEmpty} value={''} />
					)}
				</Select>
				<FormControl.ErrorMessage isReadOnly leftIcon={<WarningOutlineIcon />}>
					{errorMessage ? errorMessage : 'Поля являеться обязательным'}
				</FormControl.ErrorMessage>
			</FormControl>
		</Center>
	)
}

export default SelectPicker
