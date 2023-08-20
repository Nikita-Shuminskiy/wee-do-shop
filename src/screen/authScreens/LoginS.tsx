import React from 'react'
import {StyleSheet} from 'react-native'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import {BaseWrapperComponent} from '../../components/baseWrapperComponent'
import {Box, Image} from 'native-base'
import TextInput from '../../components/TextInput'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import logoImg from '../../assets/images/logoWeeDo.png'
import {useFormik} from 'formik'
import {validateEmail} from '../../utils/utils'
import {colors} from '../../assets/colors/colors'
import Button from '../../components/Button'
import {routerConstants} from '../../constants/routerConstants'
import rootStore from '../../store/RootStore'
import PrivacyPolicy from "../../components/PrivacyPolicy";

type LoginSProps = {
    navigation: NavigationProp<ParamListBase>
}

const LoginS = ({navigation}: LoginSProps) => {
    const {AuthStoreService} = rootStore
    const onSubmit = (values) => {
        AuthStoreService.login({
            email: values.email.trim(),
            password: values.password,
        })
        setSubmitting(false)
    }
    const {handleChange, handleBlur, handleSubmit, values, errors, isSubmitting, setSubmitting} =
        useFormik({
            initialValues: {
                email: '',
                password: '',
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
                return errors
            },
        })
    const onPressSignUpHandler = () => {
        navigation.navigate(routerConstants.REGISTRATION)
    }
    const onPressCourierHandler = () => {
        navigation.navigate(routerConstants.COURIER_REGISTER)
    }
    return (<BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box w={'100%'} alignItems={'center'} justifyContent={'space-evenly'} flex={1} paddingX={5}>
                <Image w={247} h={318} alt={'logo'} source={logoImg} mt={5}/>
                <Box w={'100%'} mb={5}>
                    <TextInput onChangeText={handleChange('email')}
                               placeholder={'Enter e-mail'}
                               value={values.email}
                               onBlur={handleBlur('email')}
                               errorMessage={!validateEmail(values.email.trim()) && errors.email && 'Incorrect email address entered'}
                               isInvalid={!!(errors.email && !validateEmail(values.email.trim()))}
                               isRequired={true}
                               label={'Email'}
                               borderRadius={16}
                               type={'text'}
                               iconRight={<MaterialCommunityIcons name={'email-edit-outline'} size={24}
                                                                  color={colors.gray}/>}/>

                    <TextInput onChangeText={handleChange('password')}
                               placeholder={'Enter password'}
                               onBlur={handleBlur('password')}
                               isInvalid={!!(errors.password && values.password.length <= 3)}
                               errorMessage={
                                   !!errors.password &&
                                   values.password.length <= 3 &&
                                   'The password must be at least 4 characters long'
                               }
                               value={values.password}
                               label={'Password'}
                               isRequired={true}
                               type={'password'} borderRadius={16}/>
                </Box>
                <Box w={'100%'}>
                    <Button styleText={styles.textBtn} backgroundColor={colors.green} disabled={
                        !!(errors.email && !validateEmail(values.email.trim())) ||
                        !!(errors.password && values.password.length <= 3) ||
                        isSubmitting
                    } onPress={handleSubmit} title={'Sign in'}/>
                    <Button styleContainer={styles.styleContainerBtn} styleText={{color: colors.black}}
                            backgroundColor={'transparent'} onPress={onPressSignUpHandler}
                            title={'Sign up'}/>
                    {/*<Box mt={3}>
						<Link onPress={onPressCourierHandler} styleText={styles.linkCourierText} text={'Become a courier'} />
					</Box>*/}
                </Box>
                <PrivacyPolicy/>
            </Box>
        </BaseWrapperComponent>
    )
}
const styles = StyleSheet.create({
    linkCourierText: {
        fontSize: 18,
        color: colors.gray,
        borderBottomWidth: 1,
        borderColor: colors.gray,
    },
    textBtn: {
        color: colors.white
    },
    styleContainerBtn: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: colors.gray,
    },

})


export default LoginS
