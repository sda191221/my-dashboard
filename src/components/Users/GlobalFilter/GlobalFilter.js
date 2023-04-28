import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './GlobalFilter.module.css'

export const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter)

    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1000)

    const handleInputChange = e => {
        const inputValue = e.target.value;
        if (inputValue.length <= 15) {
            setValue(inputValue);
            onChange(inputValue);
        }
    };

    return (
        <span className={classes.searchContainer}>
            <FontAwesomeIcon icon={faSearch} className={classes.searchIcon} />
            <input
                value={value || ''}
                onChange={handleInputChange}
                className={classes.searchInput}
                placeholder="Search"
            />
        </span>
    )
}