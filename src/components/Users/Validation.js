export const validateFirstName = (value) => {
    if (!/^[a-zA-Z]{3,10}$/.test(value)) {
        return 'First Name should be alphabetic with a minimum of 3 and a maximum of 10 characters'
    }
}

export const validateLastName = (value) => {
    if (!/^[a-zA-Z]{3,10}$/.test(value)) {
        return 'Last Name should be alphabetic with a minimum of 3 and a maximum of 10 characters'
    }
}

export const validateDateOfBirth = (value) => {
    const dateRegex = /^(\d{1,2})[-/ ](0?\d|1[0-2])[-/ ](\d{4})$/
    const dateArray = value.match(dateRegex)
    if (!dateArray) {
        return 'Date of Birth should be in the format of DD/MM/YYYY'
    }
    const day = Number(dateArray[1])
    const month = Number(dateArray[2])
    const year = Number(dateArray[3])
    const date = new Date(year, month - 1, day)
    if (isNaN(date.getTime())) {
        return 'Date of Birth should be a valid date'
    }
}

export const validateCountry = (value) => {
    if (!/^[a-zA-Z]{3,15}$/.test(value)) {
        return 'Country name should be alphabetic with a minimum of 3 and a maximum of 15 characters'
    }
}

export const validatePhone = (value) => {
    if (!/^\d{10}$/.test(value)) {
        return 'Phone number should be exactly 10 digits'
    }
}

export const validateEmail = (value) => {
    // eslint-disable-next-line
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(value)) {
        return 'Email should be a valid email address'
    }
}

export const validateAge = (value) => {
    const age = parseInt(value, 10)
    if (isNaN(age) || age <= 0 || age >= 100) {
        return 'Age should be a number between 1 and 99'
    }
}