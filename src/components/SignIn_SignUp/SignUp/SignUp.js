import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
    Box,
    Button,
    FormControl,
    Grid,
    TextField,
    Typography,
    FormHelperText,
    InputAdornment

} from '@mui/material';
import classes from './SignUp.module.css';

const SignUp = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            dateOfBirth: '',
            age: '',
            country: '',
            phone: '',
        },
        validationSchema: yup.object({
            firstName: yup
                .string()
                .min(5, 'First name must be at least 5 characters')
                .max(12, 'First name must be at most 12 characters')
                .required('Required'),
            lastName: yup
                .string()
                .min(5, 'Last name must be at least 5 characters')
                .max(12, 'Last name must be at most 12 characters')
                .required('Required'),
            email: yup.string().email('Invalid email').required('Required'),
            password: yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
            confirmPassword: yup
                .string()
                .required('Required')
                .oneOf([yup.ref('password'), null], 'Passwords must match'),
            dateOfBirth: yup
                .date()
                .required('Required')
                .max(moment().subtract(18, 'years').toDate(), 'You must be at least 18 years old'),
            age: yup
                .number()
                .required('Required')
                .test('calculate-age', 'Your age and Birth date should have match', function (value) {
                    const birthDate = this.parent.dateOfBirth;
                    const age = moment().diff(birthDate, 'years');
                    return age >= 18 && age === value;
                }),
            country: yup.string().required('Required').min(4, 'Country name must be at least 4 characters'),
            phone: yup.string().required('Required').min(10, 'Phone number must be at least 10 characters'),
        }),
        onSubmit: (values) => {
            const data = {
                id: '',
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                password: values.password,
                date_of_birth: values.dateOfBirth,
                age: values.age,
                country: values.country,
                phone: values.phone,
            };

            axios
                .post('http://localhost:4000/data', data)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            navigate('/signIn');
        },
    });

    return (
        <Box>
            <Typography variant="h2">Registration</Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={formik.touched.firstName && Boolean(formik.errors.firstName)}>
                            <TextField
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputLabelProps={{
                                    shrink: true,
                                    className: classes.customLabel,
                                }}
                            />
                            {formik.touched.firstName && formik.errors.firstName ? <div className={classes.error}>{formik.errors.firstName}</div> : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={formik.touched.lastName && Boolean(formik.errors.lastName)}>
                            <TextField
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputLabelProps={{
                                    shrink: true,
                                    className: classes.customLabel,
                                }}
                            />
                            {formik.touched.lastName && formik.errors.lastName ? <div className={classes.error}>{formik.errors.lastName}</div> : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={formik.touched.email && Boolean(formik.errors.email)}>
                            <TextField
                                id="email"
                                name="email"
                                label="E-mail"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputLabelProps={{
                                    shrink: true,
                                    className: classes.customLabel,
                                }}
                            />
                            {formik.touched.email && formik.errors.email ? <div className={classes.error}>{formik.errors.email}</div> : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={formik.touched.password && Boolean(formik.errors.password)}>
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputLabelProps={{
                                    shrink: true,
                                    className: classes.customLabel,
                                }}
                            />
                            {formik.touched.password && formik.errors.password ? <div className={classes.error}>{formik.errors.password}</div> : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}>
                            <TextField
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputLabelProps={{
                                    shrink: true,
                                    className: classes.customLabel,
                                }}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className={classes.error}>{formik.errors.confirmPassword}</div> : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}>
                            {/* <InputLabel htmlFor="dateOfBirth">Date of Birth</InputLabel> */}
                            <TextField
                                type='datet'
                                id="dateOfBirth"
                                name="dateOfBirth"
                                label="Date of Birth"
                                value={formik.values.dateOfBirth}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            dd/mm/yy
                                        </InputAdornment>
                                    )
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    className: classes.customLabel,
                                }}

                            />
                            {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                                <FormHelperText>{formik.errors.dateOfBirth}</FormHelperText>
                            ) : null}
                            {/* <FormHelperText>Format: DD/MM/YY</FormHelperText> */}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={formik.touched.age && Boolean(formik.errors.age)}>
                            <TextField
                                id="age"
                                name="age"
                                label="Age"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputLabelProps={{
                                    shrink: true,
                                    className: classes.customLabel,
                                }}
                            />
                            {formik.touched.age && formik.errors.age ? <div className={classes.error}>{formik.errors.age}</div> : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={formik.touched.country && Boolean(formik.errors.country)}>
                            <TextField
                                id="country"
                                name="country"
                                label="Country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputLabelProps={{
                                    shrink: true,
                                    className: classes.customLabel,
                                }}
                            />
                            {formik.touched.country && formik.errors.country ? <div className={classes.error}>{formik.errors.country}</div> : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={formik.touched.phone && Boolean(formik.errors.phone)}>
                            <TextField
                                id="phone"
                                name="phone"
                                label="Phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputLabelProps={{
                                    shrink: true,
                                    className: classes.customLabel,
                                }}
                            />
                            {formik.touched.phone && formik.errors.phone ? <div className={classes.error}>{formik.errors.phone}</div> : null}
                        </FormControl>
                    </Grid>
                </Grid>
                <div className='buttons'>
                    <Button type='submit'>Submit</Button>
                    <Button type='reset' onClick={() => {
                        formik.handleReset();
                    }}>Reset</Button>
                </div>
            </form>
        </Box>

    );
};

export default SignUp;

// 3360 0363 4069
