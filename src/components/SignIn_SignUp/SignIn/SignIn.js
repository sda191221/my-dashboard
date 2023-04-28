import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useContext } from 'react';
import { AuthContext } from '../../../auth/AuthContext';
import axios from 'axios';
import {
    Button,
    Typography,
    Box
} from '@mui/material';
import { CustomTextField } from './Styles/CustomTextField'
import classes from './SignIn.module.css'

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
        console.log("Submitted");
        setSubmitting(true);
        handleSignIn(values);
        setSubmitting(false);

    };
    const handleSignUp = (values) => {

        console.log('Sign-up', values);
        navigate('/signup')
    };

    const handleReset = (values, { setSubmitting }) => {
        //resetForm();
        navigate('/signIn');
        setSubmitting(false);
    };

    const handleSignIn = (values) => {
        const { email, password } = values;

        const user = users.find((u) => u.email === email);

        if (user && user.password === password) {
            console.log('Sign-in successful', user);

            setLoginUser(user);
            setIsLoggedIn(true);

            // store login status in cookie
            // Cookies.set('isLoggedIn', true);
            localStorage.setItem('isLoggedIn', true);

            navigate('/signIn');
            console.log(isLoggedIn);

        } else {
            console.log(email, password);
            console.log('Sign-in failed: incorrect email or password');
        }
    };


    useEffect(() => {
        const isLoggedInStorage = localStorage.getItem('isLoggedIn');
        if (isLoggedInStorage === 'true') {
            setIsLoggedIn(true);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Box
            display="flex"
            alignItems="center"
            marginTop={5}
            marginBottom={5}
            flexDirection="row"
            className="signin-container"
        >
            {!isLoggedIn ?
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                >
                    {({ isSubmitting }) => (
                        <Form
                            component={Box}
                            display="flex"


                            margin={1}
                            width="100%"
                        >
                            <Typography component="h1" variant="h5">
                                Sign In
                            </Typography>
                            <Field
                                as={CustomTextField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus


                            />
                            <ErrorMessage name="email" component="div" className={classes.error} />
                            <Field
                                as={CustomTextField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"


                            />

                            <ErrorMessage name="password" component="div" className={classes.error} />
                            <Box
                                display="flex"
                                alignItems="center"
                                marginTop={5}
                                marginBottom={5}>
                                <Button variant="contained" type="submit" disabled={isSubmitting}>
                                    Sign In
                                </Button>
                                <Button variant="outlined" type="reset">
                                    Reset
                                </Button>
                            </Box>
                            <Button variant="text" onClick={handleSignUp}>
                                Not Registered?...Sign Up Here
                            </Button>

                        </Form>

                    )}
                </Formik>
                :
                <Box
                    display="flex"

                >
                    <Typography component="h2" variant="h5" color="primary">
                        Welcome, {loginUser.first_name}!
                    </Typography>


                </Box>
            }
        </Box>

    );
};

export default SignIn;



