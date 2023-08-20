import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import {BaseWrapperComponent} from '../../components/baseWrapperComponent'
import {Box, Image, Text} from 'native-base'
import CustomInput from '../../components/TextInput'
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons'
import logoImg from '../../assets/images/logoWeeDo.png'
import {useFormik} from 'formik'
import {validateEmail} from '../../utils/utils'
import {colors} from '../../assets/colors/colors'
import Button from '../../components/Button'
import PhoneNumberField from '../../components/PhoneField'
import location from '../../assets/images/location-register.png'
import arrowLeft from '../../assets/images/arrow-left.png'
import rootStore from '../../store/RootStore'
import {RoleType} from 'api/authApi'
import {routerConstants} from "../../constants/routerConstants";
import ArrowBack from "../../components/ArrowBack";
import {observer} from "mobx-react-lite";
import AuthStore, {AddressType} from "../../store/AuthStore/auth-store";
import {getFormattedAddress} from "../../components/MapViews/utils";
type CountryData = {
    callingCode: string[];
    cca2: string;
    currency: string[];
    flag: string;
    name: string;
    region: string;
    subregion: string;
};
const countryDataDefault = {
    callingCode: ['66'],
    cca2: "TH",
    currency: ["THB"],
    flag: "flag-th",
    name: "Thailand",
    region: "Asia",
    subregion: "South-Eastern Asia",
}

type LoginSProps = {
    navigation: NavigationProp<ParamListBase>
}

export type UserRegisterDataType = {
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: AddressType,
    role: RoleType,
}
const RegisterS = observer(({navigation}: LoginSProps) => {
    const {AuthStoreService} = rootStore
    const {currentLocation, setLocation} = AuthStore
    const [isValidPhone, setIsValidPhone] = useState(false)
    const [countryCode, setCountryCode] = useState<CountryData>(countryDataDefault)

    const onSubmit = (values: UserRegisterDataType) => {
        const formattedPhoneNumber = `+${countryCode.callingCode[0]}${values.phone}`
        AuthStoreService.registration({
            ...values,
            phone: formattedPhoneNumber,
            address: currentLocation
        })
        setSubmitting(false)
    }
    const {handleChange, handleBlur, touched, handleSubmit, values, errors, isSubmitting, setSubmitting, setValues} =
        useFormik({
            initialValues: {
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
                address: {} as AddressType,
                phone: '',
                role: 'customer'
            },
            onSubmit: onSubmit,
            validateOnChange: false,
            validateOnMount: false,
            validateOnBlur: false,
            validate: (values) => {
                const errors = {}
                if (!validateEmail(values.email)) {
                    errors['email'] = true
                }
                if (values.password.length <= 3) {
                    errors['password'] = true
                }
                if (!values.firstName.trim()) {
                    errors['firstName'] = true
                }
                if (values.password !== values.confirmPassword) {
                    errors['confirmPassword'] = true
                }
                return errors
            },
        })

    const onValidNumberHandler = (isValidNumber: boolean) => {
        setIsValidPhone(isValidNumber)
    }
    const onPressGoBack = () => {
        navigation.goBack()
    }
    const disabledBtnSignUp = !!(errors.email && !validateEmail(values.email.trim())) ||
        !!(errors.password && values.password.length <= 3) ||
        !!(errors.phone && !values.phone) ||
        !!(errors.firstName && !values.firstName.trim()) ||
        !!(errors.confirmPassword && !values.confirmPassword) ||
        isSubmitting ||
        !!(!isValidPhone && touched.phone)
    const onPressNavigateToLocation = () => {
        navigation.navigate(routerConstants.ALLOW_LOCATION)
    }


    const formatted_address = getFormattedAddress(currentLocation)
    const onChangeCountry = (country) => {
        setCountryCode(country)
    }
    return (<BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box alignItems={'center'}>
                <Box mt={5} mb={5} position={'absolute'} left={5}>
                    <ArrowBack goBackPress={onPressGoBack} img={arrowLeft}/>
                </Box>
                <Image w={123} h={158} alt={'logo'} source={logoImg} mt={5} mb={5}/>
            </Box>
            <Box w={'100%'} alignItems={'center'} justifyContent={'flex-start'} flex={1} paddingX={5}>
                <Box w={'100%'} mb={5}>
                    <CustomInput onChangeText={handleChange('firstName')}
                                 placeholder={'First name*'}
                                 value={values.firstName}
                                 onBlur={handleBlur('firstName')}
                                 errorMessage={!values.firstName.trim() && 'Enter a name'}
                                 isInvalid={!!(errors.email && !validateEmail(values.email.trim()))}
                                 isRequired={true}
                                 borderRadius={16}
                                 iconRight={<AntDesign name='user' size={24} color={colors.gray}/>}
                                 type={'text'}/>

                    <CustomInput onChangeText={handleChange('lastName')}
                                 placeholder={'Last name'}
                                 value={values.lastName}
                                 onBlur={handleBlur('lastName')}
                                 errorMessage={!values.firstName.trim() && 'Enter a name'}
                                 isInvalid={!!(errors.email && !validateEmail(values.email.trim()))}
                                 isRequired={true}
                                 borderRadius={16}
                                 iconRight={<AntDesign name='user' size={24} color={colors.gray}/>}
                                 type={'text'}/>

                    <CustomInput onChangeText={handleChange('email')}
                                 placeholder={'Email*'}
                                 value={values.email}
                                 onBlur={handleBlur('email')}
                                 errorMessage={!validateEmail(values.email.trim()) && errors.email && 'Incorrect email address entered'}
                                 isInvalid={!!(errors.email && !validateEmail(values.email.trim()))}
                                 isRequired={true}
                                 borderRadius={16}
                                 type={'text'}
                                 iconRight={<MaterialCommunityIcons name={'email-edit-outline'} size={24}
                                                                  color={colors.gray}/>}/>
                    <Box mt={2}>
                        <PhoneNumberField onValidNumber={onValidNumberHandler}
                                          onChangeCountry={onChangeCountry}
                                          errorMessage={'Incorrect phone number'}
                                          isInvalid={!!(!isValidPhone && touched.phone)}
                                          isRequired={true}
                                          defaultValue={values.phone}
                                          onChangeText={handleChange('phone')}/>
                    </Box>
                    <CustomInput onChangeText={handleChange('password')}
                                 placeholder={'Password*'}
                                 onBlur={handleBlur('password')}
                                 isInvalid={!!(errors.password && values.password.length <= 3)}
                                 errorMessage={
                                   !!errors.password &&
                                   values.password.length <= 3 &&
                                   'The password must be at least 4 characters long'
                               }
                                 value={values.password}
                                 isRequired={true}
                                 type={'password'} borderRadius={16}/>

                    <CustomInput onChangeText={handleChange('confirmPassword')}
                                 placeholder={'Confirm password*'}
                                 onBlur={handleBlur('confirmPassword')}
                                 value={values.confirmPassword}
                                 errorMessage={
                                   (touched.confirmPassword && errors.confirmPassword && !values.confirmPassword) ||
                                   (values.confirmPassword !== values.password && touched.confirmPassword)
                                       ? 'The passwords dont match'
                                       : ''
                               }
                                 isRequired={true}
                                 isInvalid={
                                   !!(touched.confirmPassword && errors.confirmPassword && !values.confirmPassword) ||
                                   !!(values.confirmPassword !== values.password && touched.confirmPassword)
                               }
                                 type={'password'} borderRadius={16}/>
                </Box>
                <Box alignItems={'center'} mb={1}>
                    <TouchableOpacity onPress={onPressNavigateToLocation}>
                        <Image w={170} h={105} alt={'location'} source={location}/>
                        <Text color={colors.gray} mt={2} fontWeight={'500'}> Add you location address*</Text>
                    </TouchableOpacity>
                    {formatted_address &&
                        <Text fontSize={16} fontWeight={'600'}>{formatted_address}</Text>}

                </Box>
                <Box w={'100%'} flex={1} alignItems={'flex-start'}>
                    <TextInput
                        placeholder={'Enter apartment'}
                        style={styles.input}
                        keyboardType="numeric"
                        value={currentLocation?.fullAddress?.apartment}
                        onChangeText={(text) => {
                            if(text.length > 5) {
                                return
                            }
                            setLocation({
                                ...currentLocation,
                                fullAddress: {...currentLocation?.fullAddress, apartment: text}
                            })
                        }}
                    />
                </Box>
                <Box w={'100%'} mt={5} mb={5}>
                    <Button styleContainer={styles.styleContainerBtnUp} disabled={
                        disabledBtnSignUp
                    } onPress={handleSubmit} title={'Sign up'}/>

                </Box>
            </Box>
        </BaseWrapperComponent>
    )
})
const styles = StyleSheet.create({
    input: {
        width: '100%',
        paddingVertical: 5,
        paddingLeft: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.grayLight,
        color: colors.gray
    },
    styleContainerBtn: {
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: colors.gray,
    },
    styleContainerBtnUp: {
        marginTop: 10,
        backgroundColor: colors.green,
    },
})


export default RegisterS
