import React, { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LoginContext } from '../../context/LoginContext'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {

    const navigate = useNavigate()
    const { login, error, loggedIn } = useContext(LoginContext)

    const { formState: { errors }, register, handleSubmit } = useForm()

    const onSubmit = async (data) => {
        await login(data)
    }


    useEffect(() => {
        if (loggedIn && error === '') {
            navigate('/')
        }
    }, [loggedIn, navigate, error])



    return (
        <div className="register__form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="register__form">

                <h3>Ingresa</h3>

                <label htmlFor="apellido">E-mail</label>
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    {...register('email', {
                        required: true,
                        pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                    })}
                />
                {errors.email?.type === 'required' && <p style={{ color: 'red', fontSize: "14px" }}>E-mail es requerido</p>}
                {errors.email?.type === 'pattern' && <p style={{ color: 'red', fontSize: "14px" }}>Formato no válido</p>}

                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    {...register('password', {
                        required: true,

                    })}
                />
                {errors.password?.type === 'required' && <p style={{ color: 'red', fontSize: "14px" }}>Contraseña es requerida</p>}
                {error === 'auth/wrong-password' && <p className="login__error">Contraseña incorrecta</p>}
                {error === 'auth/user-not-found' && <p className="login__error">E-mail inválido</p>}
                {error === 'auth/too-many-requests' && <p className="login__error">Demasiados intentos. Prueba más tarde</p>}
                <Link to="/register" className="login__link">No tenés cuenta? Create una</Link>

                <button type="submit" className="register__form-submit">Ingresar</button>
            </form>
        </div>
    )
}

export default Login