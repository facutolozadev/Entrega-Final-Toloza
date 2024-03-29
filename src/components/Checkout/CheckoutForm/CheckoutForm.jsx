import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './CheckoutForm.css'
import { getDocs, collection, addDoc, query, where, documentId, writeBatch } from 'firebase/firestore'
import { db } from '../../../firebase/config'

function CheckoutForm({ cart, calcTotalPrice, setIsLoading, emptyCart, setNoStock, user, logout }) {

    const { formState: { errors }, register, handleSubmit, watch } = useForm()

    const navigate = useNavigate()

    const onSubmit = async (data) => {

        setIsLoading(true)

        const orden = {
            cliente: data,
            productos: cart.map((prod) => ({ id: prod.id, price: prod.price, cantidad: prod.cantidad, name: prod.name })),
            total: calcTotalPrice(),
            fecha: new Date().toLocaleDateString(),
            loggedInfo: user ? user : null
        }


        const outOfStock = []

        const batch = writeBatch(db)
        const ordersRef = collection(db, 'orders')
        const productosRef = collection(db, 'productos')

        const itemsRef = query(productosRef, where(documentId(), 'in', cart.map(prod => prod.id)))

        const response = await getDocs(itemsRef)

        response.docs.forEach((doc) => {
            const item = cart.find(prod => prod.id === doc.id)

            if (doc.data().stock >= item.cantidad) {
                batch.update(doc.ref, {
                    stock: doc.data().stock - item.cantidad
                })
            } else {
                outOfStock.push(item)
            }
        })

        if (outOfStock.length === 0) {
            await batch.commit();

            addDoc(ordersRef, orden)
                .then((doc) => {
                    navigate(`/checkout/order/${doc.id}`)
                    emptyCart()
                })
        } else {
            setNoStock(outOfStock)
        }

    }

    const firstMail = watch('mail')
    const secondMail = watch('mail2')

    const mailValidator = () => {
        return firstMail === secondMail
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="checkout__form">

            <div className="checkout__form-input-container">
                <label htmlFor="nombre">Nombre:</label>
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
                <label htmlFor="apellido">Teléfono:</label>
                <input
                    placeholder="Teléfono..."
                    type="number"
                    {...register('telefono', {
                        required: true,
                        minLength: 5
                    })}
                />
                {errors.telefono?.type === 'required' && <p style={{ color: 'red', fontSize: "14px" }}>Teléfono es requerido</p>}
                {errors.telefono?.type === 'minLength' && <p style={{ color: 'red', fontSize: "14px" }}>Este campo necesita mínimo 5 caracteres</p>}


            </div>

            {
                user.logged ? (
                    <div>
                        <p style={{ width: '150px', marginBottom: '50px' }}>Estás comprando con la cuenta de {user.email}</p>

                        <button className="checkout__logout" type="button" onClick={logout}>Salir de la cuenta</button>

                    </div>
                ) : (
                    <>
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
                    </>
                )
            }


            <button className="checkout__terminar-compra" type="submit">Terminar compra</button>
        </form>
    )
}

export default CheckoutForm