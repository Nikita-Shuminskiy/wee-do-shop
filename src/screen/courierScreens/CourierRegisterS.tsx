/*
import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Box, Image} from "native-base";
import logoImg from '../../assets/images/logoWeeDo.png'
import ArrowBack from "../../components/ArrowBack";
import arrowLeft from "../../assets/images/arrow-left.png";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {useFormik} from "formik";
import {AddressType} from "../../store/AuthStore/auth-store";
import {validateEmail} from "../../utils/utils";
import {UserRegisterDataType} from "../authScreens/RegisterS";
import {routerConstants} from "../../constants/routerConstants";
import CustomInput from "../../components/TextInput";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "../../assets/colors/colors";
import PhoneNumberField from "../../components/PhoneField";
import AuthStoreService from "../../store/service/AuthStoreService/auth-store-service";
import Button from "../../components/Button";
import {StyleSheet} from "react-native";
import CameraComponent from "../../components/CameraComponent";

type CourierRegisterSProps = {
    navigation: NavigationProp<ParamListBase>
}
const CourierRegisterS = ({navigation}: CourierRegisterSProps) => {
    const onPressGoBack = () => {
        navigation.goBack()
    }

    const onSubmit = (values: UserRegisterDataType) => {
        /!*  AuthStoreService.registration({
              ...values,
              address: currentLocation
          })*!/
        setSubmitting(false)
    }
    const [isValidPhone, setIsValidPhone] = useState(false)

    const {handleChange, handleBlur, touched, handleSubmit, values, errors, isSubmitting, setSubmitting, setValues} =
        useFormik({
            initialValues: {
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
                phone: '',
                rightsId: '',
                role: 'courier'
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
    const disabledBtnSignUp = !!(errors.email && !validateEmail(values.email.trim())) ||
        !!(errors.password && values.password.length <= 3) ||
        !!(errors.phone && !values.phone) ||
        !!(errors.firstName && !values.firstName.trim()) ||
        !!(errors.confirmPassword && !values.confirmPassword) ||
        isSubmitting ||
        !!(!isValidPhone && touched.phone)

    return (
      <>
          <BaseWrapperComponent isKeyboardAwareScrollView={true}>
              <Box alignItems={'center'}>
                  <Box mt={5} mb={5} position={'absolute'} left={5}>
                      <ArrowBack goBackPress={onPressGoBack} img={arrowLeft}/>
                  </Box>
                  <Image w={123} h={158} alt={'logo'} source={logoImg} mt={5}/>
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

                  <Box w={'100%'} mt={5} mb={5}>
                      <Button styleContainer={styles.styleContainerBtnUp} disabled={
                          disabledBtnSignUp
                      } onPress={handleSubmit} title={'Apply now'}/>

                  </Box>
              </Box>
          </BaseWrapperComponent>
          <CameraComponent/>
      </>
    );
};
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

export default CourierRegisterS;
*/
