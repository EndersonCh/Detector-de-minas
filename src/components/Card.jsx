import React from 'react'
import './Card.css';

function Card(props) {
  return (
 
           <div className='Card'>
        <img src={props.ima} />
        <h2>{props.text}</h2>
    </div>

  )

  
}

export default Card