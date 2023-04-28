import React, { useState } from 'react'
import { validateFirstName, validateLastName, validateDateOfBirth, validateCountry, validatePhone, validateEmail, validateAge } from '../Validation'
import classes from './ColumnFilter.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const value = e.target.value
        const { id } = column

        let validationError = null
        let maxLength = 12
        switch (id) {
            case 'first_name':
                validationError = validateFirstName(value)
                break
            case 'last_name':
                validationError = validateLastName(value)
                break
            case 'date_of_birth':
                validationError = validateDateOfBirth(value)
                break
            case 'country':
                validationError = validateCountry(value)
                break
            case 'phone':
                validationError = validatePhone(value)

                break
            case 'email':
                validationError = validateEmail(value)
                maxLength = 15
                break
            case 'age':
                validationError = validateAge(value)
                maxLength = 3
                break
            default:
                break
        }

        setError(validationError)
        setFilter(value)

        const inputElement = e.target
        inputElement.maxLength = maxLength
        if (!value) {
            setError(null)
        }
    }

    const showError = error && filterValue

    return (
        <>
            <div className={classes.filterContainer}>
                <FontAwesomeIcon icon={faSearch} className={classes.searchIcon} />
                <input
                    value={filterValue || ''}
                    onChange={handleChange}
                    onClick={(e) => e.stopPropagation()}
                    maxLength={12}
                    className={classes.filterInput}
                />
            </div>
            <div>{showError && <span className={classes.filterError}>{error}</span>}</div>
        </>
    );
}