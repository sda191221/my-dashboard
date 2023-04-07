import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './SignUp.css'

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
            firstName: yup.string().min(5, 'First name must be at least 5 characters').max(12, 'First name must be at most 12 characters').required('Required'),
            lastName: yup.string().min(5, 'Last name must be at least 5 characters').max(12, 'Last name must be at most 12 characters').required('Required'),
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
            navigate('/signIn')
        },
    });


    return (
        <div>
            <h2>Registration</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor='firstName'>First Name</label>
                    <input
                        type='text'
                        id='firstName'
                        name='firstName'
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.firstName && formik.errors.firstName ? <div className="error">{formik.errors.firstName}</div> : null}

                <div>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.lastName && formik.errors.lastName ? <div className="error">{formik.errors.lastName}</div> : null}

                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}

                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}

                <div>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        type='password'
                        id='confirmPassword'
                        name='confirmPassword'
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="error">{formik.errors.confirmPassword}</div>
                ) : null}

                <div>
                    <label htmlFor='dateOfBirth'>Date of Birth</label>
                    <input
                        type='datetime-local'
                        id='dateOfBirth'
                        name='dateOfBirth'
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                    <div className="error">{formik.errors.dateOfBirth}</div>
                ) : null}

                <div>
                    <label htmlFor='age'>Age</label>
                    <input
                        type='number'
                        id='age'
                        name='age'
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.age && formik.errors.age ? <div className="error">{formik.errors.age}</div> : null}

                <div>
                    <label htmlFor='country'>Country</label>
                    <input
                        type='text'
                        id='country'
                        name='country'
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.country && formik.errors.country ? <div className="error">{formik.errors.country}</div> : null}

                <div>
                    <label htmlFor='phone'>Phone</label>
                    <input
                        type='text'
                        id='phone'
                        name='phone'
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.phone && formik.errors.phone ? <div className="error">{formik.errors.phone}</div> : null}

                <div className='buttons'>
                    <button type='submit'>Submit</button>
                    <button type='reset' onClick={() => {
                        formik.handleReset();
                    }}>Reset</button>
                </div>
            </form>
        </div >
    );
};

export default SignUp;