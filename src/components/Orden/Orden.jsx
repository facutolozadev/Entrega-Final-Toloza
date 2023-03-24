import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './Orden.css'
import { collection, doc, where } from 'firebase/firestore'

import { db } from '../../firebase/config'


function Orden() {

    const { id } = useParams()

    const ordersRef = collection(db, 'orders')

    const [orderInfo, setOrderInfo] = useState([])
    
    //No se como acceder a la información de la orden

    return (
        <div className="orden__container">
            <div className="orden">
                <h3>Tu compra se generó correctamente!</h3>
                <p><strong>Identificador de orden:</strong> 50505050</p>
                <ul>
                    <strong>Datos del cliente:</strong>
                    <li>Nombre:</li>
                    <li>Apellido:</li>
                    <li>Dirección de correo:</li>
                </ul>
                <strong>Fecha de creación: </strong>
                <h3 >Gracias por comprar en Zdravý fitness!</h3>
            </div>
        </div>
    )
}

export default Orden