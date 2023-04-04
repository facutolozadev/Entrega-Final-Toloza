import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'




export const LoginContext = createContext()

function LoginProvider({ children }) {

    const [error, setError] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    const [user, setUser] = useState({
        email: null,
        logged: false,
        uid: null
    })



    const registerUser = (data) => {
        setError("")
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                setLoggedIn(true)
            })
            .catch((error) => {
                console.log(error.code)
                if (error.code) {
                    setError(error.code)
                }
            })

    }

    const login = (data) => {
        setError("")
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                setLoggedIn(true)
            })
            .catch((error) => {
                console.log(error.message)
                if (error.code) {
                    setError(error.code)
                }
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    email: user.email,
                    logged: true,
                    uid: user.uid
                })
            } else {
                logout()
            }
        })
    }, [])


    const logout = () => {
        signOut(auth)
            .then(() => {
                setLoggedIn(false)
                setUser({
                    email: null,
                    logged: false
                })
            })
    }




    return (
        <LoginContext.Provider value={{
            user,
            registerUser,
            login,
            logout,
            error,
            loggedIn,
        }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider