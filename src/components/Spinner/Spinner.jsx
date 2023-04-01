import React from 'react'
import './Spinner.css'

function Spinner({ message }) {
  return (
    <div className="spinner__container">
        <div className="spinner"></div>
        <h3>{message}</h3>
    </div>
  )
}

export default Spinner