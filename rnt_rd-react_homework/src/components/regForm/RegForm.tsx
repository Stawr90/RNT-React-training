import React from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';

import { fetchRegUser, inpItems } from './regSlice';
import { loginOrReg } from '../loginForm/loginSlice';
import { IFormData } from 'types/TypesBase';

import netflixBg from '../../resources/img/netflix_bg.jpg';
import './regForm.scss';

const RegForm = () => {
    const inputItems = useSelector(inpItems);
    const dispatch = useDispatch();

    const validateUsername = (username: string | undefined) => {
        const usernameRegExp = /^[A-Z0-9]+$/;
        return username && !usernameRegExp.test(username) ? 'Big letters and numbers' : undefined;
    };
    const validatePassword = (password: string | undefined) => {
        return password && (password.length < 8 || new Set(password).size !== password.length) ? 'Unique symbols / more than 8' : undefined;
    }

    const submitReg = (values: IFormData, form) => {
        dispatch(fetchRegUser(values) as any);
        dispatch(loginOrReg());
        form.reset();
    }

    const validateReg = (values: IFormData) => {
        const errors: Partial<IFormData> = {};
        const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
        
        errors.username = validateUsername(values.username);
        errors.password = validatePassword(values.password);

        if (values.email && emailRegExp.test(values.email)) {
            errors.email = 'Invalid email';
        }
        if (values.password !== values.confirmPass) {
            errors.confirmPass = 'Password mismatch';
        }

        return errors;
    }

    return (
        <Form
            onSubmit={submitReg}
            validate={validateReg}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="reg">
                    <h1 className="reg__title">Netflix Roulette</h1>
                    <h2 className="reg__subtitle">Create Account</h2>
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
                    <button type="submit" className="reg__btn">Create</button>
                    <p>or <span onClick={() => dispatch(loginOrReg())}>Sign in</span></p>

                    <div className="reg__img">
                        <img src={netflixBg} alt='background'/>
                    </div>
                </form>
            )}
        />
    )
}

export default RegForm;