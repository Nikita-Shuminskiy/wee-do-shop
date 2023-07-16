import React from 'react'
import { StyleProp, Text, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {Box} from 'native-base'
import { colors } from '../assets/colors/colors'

type ButtonProps = {
  onPress: () => void
  title: string
  styleContainer?: StyleProp<any>
  styleText?: StyleProp<any>
  disabled?: boolean
  backgroundColor?: string
}
const Button = ({
                  onPress,
                  title,
                  styleContainer,
                  disabled,
                  styleText,
                  backgroundColor,
                  ...rest
                }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor ?? colors.white,
        padding: 10,
        borderRadius: 16,
        alignItems: 'center',
        width: 'auto',
        minWidth: 120,
        ...styleContainer,
      }}
      disabled={disabled}
      onPress={!disabled ? onPress : null}
      {...rest}
    >
      <Box flexDirection={'row'} alignItems={'center'}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '500',
            color: disabled ? colors.red : colors.white,
            ...styleText,
          }}
        >
          {title}
        </Text>
        {disabled && (
          <Box ml={2}>
            <MaterialIcons name="error-outline" size={24} color={colors.red}/>
          </Box>
        )}
      </Box>
    </TouchableOpacity>
  )
}
export default Button
