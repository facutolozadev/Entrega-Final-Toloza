import React, { useEffect, useContext } from 'react'
import './Register.css'
import { useForm } from 'react-hook-form'
import { LoginContext } from '../../context/LoginContext'
import { Link, useNavigate } from 'react-router-dom'


function Register() {

    const navigate = useNavigate()
    const { registerUser, error, loggedIn } = useContext(LoginContext)

    const { formState: { errors }, register, handleSubmit, watch } = useForm()

    const onSubmit = async (data) => {
        await registerUser(data)
    }

    useEffect(() => {
        if (loggedIn && error === '') {
            navigate('/')
        }
    }, [loggedIn, navigate, error])

    const firstMail = watch('password')
    const secondMail = watch('password2')

    const passwordValidator = () => {
        return firstMail === secondMail
    }



    return (
        <div className="register__form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="register__form">
                <h3>Registrate</h3>

                <label htmlFor="email">E-mail</label>
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
                        minLength: 4,
                        validate: passwordValidator
                    })}
                />
                {errors.password?.type === 'required' && <p style={{ color: 'red', fontSize: "14px" }}>Contraseña es requerida</p>}
                {errors.password?.type === 'minLength' && <p style={{ color: 'red', fontSize: "14px" }}>Debe contener al menos 4 caracteres</p>}
                {errors.password?.type === 'validate' && <p style={{ color: 'red', fontSize: "14px" }}>Las contraseñas no coinciden</p>}

                <label htmlFor="password">Repita su contraseña</label>
                <input
                    type="password"
                    placeholder="Repita su contraseña"
                    name="password"
                    {...register('password2', {
                        required: true,
                        minLength: 4,
                        validate: passwordValidator
                    })}
                />
                {errors.password2?.type === 'required' && <p style={{ color: 'red', fontSize: "14px" }}>Contraseña es requerida</p>}
                {errors.password2?.type === 'minLength' && <p style={{ color: 'red', fontSize: "14px" }}>Debe contener al menos 4 caracteres</p>}
                {errors.password2?.type === 'validate' && <p style={{ color: 'red', fontSize: "14px" }}>Las contraseñas no coinciden</p>}

                {error === 'auth/email-already-in-use' && <p className="login__error">Email ya registrado</p>}

                {error === 'auth/weak-password' && <p className="login__error">Tu contraseña es muy débil! Te recomendamos que contenga al menos 5 caracteres y un número</p>}

                <Link className="register__link" to="/login">Ya tenés cuenta? Ingresá</Link>

                <button type="submit">Registrarme</button>
            </form>
        </div>
    )
}

export default Register