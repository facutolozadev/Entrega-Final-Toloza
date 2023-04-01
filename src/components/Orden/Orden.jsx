import React, { useEffect, useState } from 'react'
import './Orden.css'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useParams } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'


function Orden() {


    const { id } = useParams()

    const [orderInfo, setOrderInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const docRef = doc(db, 'orders', id)
        getDoc(docRef)
            .then((res) => {
                setOrderInfo({ ...res.data(), id: res.id })
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return (
            <Spinner message={"Cargando"}/>
        )
    }

    return (
        <div className="orden__container">
            <div className="orden">
                <h2>Tu compra se generó correctamente!</h2>
                <h4>Identificador de orden: {orderInfo.id}</h4>
                <ul>
                    <strong>Datos del cliente: </strong>
                    <li><strong>Nombre: </strong> {orderInfo.cliente.nombre}</li>
                    <li><strong>Apellido: </strong> {orderInfo.cliente.apellido}</li>
                    <li><strong>Dirección de correo: </strong> {orderInfo.cliente.mail} </li>
                </ul>
                <ul>
                    <strong>Productos:</strong>
                    {
                        orderInfo.productos.map((producto) => <li key={producto.id}> - {producto.name} x({producto.cantidad})</li>)
                    }
                </ul>
                <p><strong>Total de compra:</strong> ${orderInfo.total}</p>
                <p><strong>Fecha de creación:</strong> {orderInfo.fecha}</p>
                <h2>Gracias por comprar en Zdravý fitness!</h2>
            </div>
        </div>
    )
}

export default Orden