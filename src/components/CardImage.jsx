
import React from 'react'


function CardImage({cardName}){

    const imagePath= `../public/images/${cardName.replace(/ /g, '_')}.jpg`
return (
  <div className='card-images-div' >
    <img src={imagePath}  className='card-images' />

  </div>
)

}

export default CardImage