import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
//import data from '../Users/MOCK_DATA.json';
import './SignIn.css'
import { useContext } from 'react';
import { AuthContext } from '../../../auth/AuthContext';
import axios from 'axios';

const SignIn = () => {
    const [users, setUsers] = useState([]);
    const [loginUser, setLoginUser] = useState([]);
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/data');
            setUsers(response.data);
        };
        fetchData();
    }, []);
    // useEffect(() => {
    //     setUsers(data.data);
    //     //console.log('Users', users);
    // }, [users]);
    // useEffect(() => {
    //     if (isLoggedIn) {
    //         navigate('/signIn');
    //     }
    // }, [isLoggedIn, navigate]);
    const initialValues = { email: '', password: '' };
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        password: Yup.string()
            .min(6, 'Must be at least 6 characters')
            .required('Required'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        handleSignIn(values);
        setSubmitting(false);

    };
    const handleSignUp = (values) => {

        console.log('Sign-up', values);
        navigate('/signup')
    };

    const handleReset = (values, { resetForm }) => {
        resetForm();
    };

    const handleSignIn = (values) => {
        const { email, password } = values;


        const user = users.find((u) => u.email === email);

        if (user && user.password === password) {
            console.log('Sign-in successful', user);

            setLoginUser(user);
            setIsLoggedIn(true);
            navigate('/signIn');
            console.log(isLoggedIn);

        } else {
            console.log('Sign-in failed: incorrect email or password');
        }
    };

    return (
        <div>
            {!isLoggedIn ?
                <div>
                    <h1>Sign In</h1>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div>
                                    <label htmlFor="email">Email </label>
                                    <Field type="email" name="email" />
                                    <ErrorMessage name="email" />
                                </div>
                                <div>
                                    <label htmlFor="password">Password </label>
                                    <Field type="password" name="password" />
                                    <ErrorMessage name="password" />
                                </div>
                                <button type="submit" disabled={isSubmitting}>
                                    Sign In
                                </button>
                                <button type="button" onClick={(e) => handleReset()}>
                                    Reset
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <button type="button" onClick={(e) => handleSignUp()}>
                        Not Registered?...Sign Up Here
                    </button>
                </div>
                : <h2>Welcome, {loginUser.first_name}</h2>}

        </div>
    );
};

export default SignIn;