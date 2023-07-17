import regex from './helpers/regex'

export const validateEmail = (email: string) => {
    return regex.email.test(email.trim())
}
