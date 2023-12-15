import React from 'react';
import { Form, Field } from 'react-final-form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginOrReg, loginGetChar, profile, fetchLoginUser } from './loginSlice';

import netflixBg from '../../resources/img/netflix_bg.jpg';
import './loginForm.scss';

interface IFormData {
    username: string;
    password: string;
}

const LoginForm = () => {
    const userChar = useSelector(profile);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(userChar).length !== 0) {
            dispatch(fetchLoginUser() as any);
        }
    }, [userChar])

    const submitLogin = (values: IFormData, form) => {
        dispatch(loginGetChar(values));
        form.reset();
    }

    const validateLogin = (values: IFormData) => {
        const errors: Partial<IFormData> = {};
        
        if (values.username && !/^[A-Z0-9]+$/.test(values.username)) {
            errors.username = 'Big letters and numbers';
        }
        if (values.password && values.password.length < 8) {
            errors.password = 'Unique symbols / more than 8';
        } else if (values.password && new Set(values.password).size !== values.password.length) {
            errors.password = 'Unique symbols / more than 8';
        }

        return errors;
    }

    return (
        <Form
            onSubmit={submitLogin}
            validate={validateLogin}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="login">
                    <h1 className="login__title">Netflix Roulette</h1>
                    <h2 className="login__subtitle">Sign In</h2>
                    <Field name="username">
                        {({ input, meta }) => (
                            <div>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                <input type="text" {...input} placeholder="Username" style={meta.error ? {border: "2px solid red"}: null}/>
                            </div>
                        )}
                    </Field>
                    <Field name="password">
                        {({ input, meta }) => (
                            <div>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                <input type="text" {...input} placeholder="Password" style={meta.error ? {border: "2px solid red"}: null}/>
                            </div>
                        )}
                    </Field>
                    
                    <button type="submit" className="login__btn">Sign In</button>
                    <p>Don't have an account? <span onClick={() => dispatch(loginOrReg())}>Sign up</span></p>

                    <div className="login__img">
                        <img src={netflixBg} alt='background'/>
                    </div>
                </form>
            )}
        />
    )
}

export default LoginForm;