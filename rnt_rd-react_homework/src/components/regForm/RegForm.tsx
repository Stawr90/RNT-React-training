import React from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';

import { fetchRegUser } from './regSlice';
import { loginOrReg } from '../loginForm/loginSlice';
import { IFormData } from 'types/TypesBase';

import netflixBg from '../../resources/img/netflix_bg.jpg';
import './regForm.scss';

const RegForm = () => {
    const dispatch = useDispatch();

    const submitReg = (values: IFormData, form) => {
        dispatch(fetchRegUser(values) as any);
        dispatch(loginOrReg());
        form.reset();
    }

    const validateReg = (values: IFormData) => {
        const errors: Partial<IFormData> = {};
        
        if (values.username && !/^[A-Z0-9]+$/.test(values.username)) {
            errors.username = 'Big letters and numbers';
        }
        if (values.password && values.password.length < 8) {
            errors.password = 'Unique symbols / more than 8';
        } else if (values.password && new Set(values.password).size !== values.password.length) {
            errors.password = 'Unique symbols / more than 8';
        }
        if (values.email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(values.email)) {
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
                    <Field name="username">
                        {({ input, meta }) => (
                            <div>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                <input type="text" {...input} placeholder="Username" style={meta.error ? {border: "2px solid red"}: null}/>
                            </div>
                        )}
                    </Field>
                    <Field name="email">
                        {({ input, meta }) => (
                            <div>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                <input type="text" {...input} placeholder="Email" style={meta.error ? {border: "2px solid red"}: null}/>
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
                    <Field name="confirmPass">
                        {({ input, meta }) => (
                            <div>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                <input type="text" {...input} placeholder="Confirm Password" style={meta.error ? {border: "2px solid red"}: null}/>
                            </div>
                        )}
                    </Field>
                    
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