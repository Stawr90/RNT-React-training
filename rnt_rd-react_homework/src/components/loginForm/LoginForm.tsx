import React from 'react';
import { Form, Field } from 'react-final-form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginOrReg, loginGetChar, profile, fetchLoginUser, inpItems } from './loginSlice';
import { IFormData } from 'types/TypesBase';

import netflixBg from '../../resources/img/netflix_bg.jpg';
import './loginForm.scss';

const LoginForm = () => {
    const userChar = useSelector(profile);
    const inputItems = useSelector(inpItems);
    const dispatch = useDispatch();

    const validateUsername = (username: string | undefined) => {
        const usernameRegExp = /^[A-Z0-9]+$/;
        return username && !usernameRegExp.test(username) ? 'Big letters and numbers' : undefined;
    };
    const validatePassword = (password: string | undefined) => {
        return password && (password.length < 8 || new Set(password).size !== password.length) ? 'Unique symbols / more than 8' : undefined;
    }

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
        
        errors.username = validateUsername(values.username);
        errors.password = validatePassword(values.password);

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
                    {inputItems.map(item => (
                        <Field name={item.name} key={item.name}>
                            {({ input, meta }) => (
                                <div>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                    <input type="text" {...input} placeholder={item.placeholder} className={meta.error ? "input_error" : null}/>
                                </div>
                            )}
                        </Field>
                    ))}
                    
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