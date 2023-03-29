import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './CheckoutForm.css'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'

function CheckoutForm({ cart, calcTotalPrice, setIsLoading, emptyCart }) {



    const { formState: { errors }, register, handleSubmit, watch } = useForm()


    const navigate = useNavigate()

    const onSubmit = (data) => {

        setIsLoading(true)
        emptyCart()

        const orden = {
            cliente: data,
            productos: cart.map((prod) => ({ id: prod.id, price: prod.price, cantidad: prod.cantidad, name: prod.name })),
            total: calcTotalPrice(),
            fecha: new Date().toLocaleDateString()
        }

        const ordersRef = collection(db, 'orders')
        addDoc(ordersRef, orden)
            .then((doc) => {
                navigate(`/checkout/order/${doc.id}`)
            })

    }

    const firstMail = watch('mail')
    const secondMail = watch('mail2')

    const mailValidator = () => {
        return firstMail === secondMail
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="checkout__form">

            <div className="checkout__form-input-container">
                <input
                    placeholder="Nombre..."
                    type="text"
                    {...register('nombre', {
                        required: true,
                        minLength: 3
                    })}
                />
                {errors.nombre?.type === 'required' && <p style={{ color: 'red', fontSize: "14px" }}>Nombre es requerido</p>}
                {errors.nombre?.type === 'minLength' && <p style={{ color: 'red', fontSize: "14px" }}>Este campo necesita mínimo 3 caracteres</p>}
            </div>
            <div className="checkout__form-input-container">
                <label htmlFor="apellido">Apellido:</label>
                <input
                    placeholder="Apellido..."
                    type="text"
                    {...register('apellido', {
                        required: true,
                        minLength: 3
                    })}
                />
                {errors.apellido?.type === 'required' && <p style={{ color: 'red', fontSize: "14px" }}>Apellido es requerido</p>}
                {errors.apellido?.type === 'minLength' && <p style={{ color: 'red', fontSize: "14px" }}>Este campo necesita mínimo 3 caracteres</p>}


            </div>
            <div className="checkout__form-input-container">
                <label htmlFor="mail">E-mail:</label>
                <input
                    placeholder="E-mail..."
                    type="mail"
                    {...register('mail', {
                        required: true,
                        minLength: 3,
                        pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                        validate: mailValidator
                    })}
                />
                {errors.mail?.type === 'required' && <p style={{ color: 'red', fontSize: "14px" }}>E-mail es requerido</p>}
                {errors.mail?.type === 'pattern' && <p style={{ color: 'red', fontSize: "14px" }}>Formato no válido</p>}
                {errors.mail?.type === 'validate' && <p style={{ color: 'red', fontSize: "14px" }}>Los mails no coinciden</p>}

            </div>
            <div className="checkout__form-input-container">
                <label htmlFor="mail-2">Repita su e-mail:</label>
                <input
                    placeholder="E-mail..."
                    type="text"
                    {...register('mail2', {
                        validate: mailValidator
                    })}
                />
                {errors.mail2?.type === 'validate' && <p style={{ color: 'red', fontSize: "14px" }}>Los mails no coinciden</p>}
            </div>


            <button className="checkout__terminar-compra" type="submit">Terminar compra</button>
        </form>
    )
}

export default CheckoutForm