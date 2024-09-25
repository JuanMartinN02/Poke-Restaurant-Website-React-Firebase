import React, {useContext} from 'react'
import {ShopContext} from '../../context/shop-context'

export const CartItem = (props) => {
  const {id, productName, price, productImage, productDesc} = props.data;
  const { cartItems, addToCart, removeFromCart } = useContext(ShopContext);

  return (
    <div className='cartItem'>
        <img src={productImage}/>

        <div className='description'>
            <p>
                <b>{productName}</b>
            </p>

            <p className='prodDesc'>{productDesc}</p>

            <p className='item-price'>${price}</p>
            <div className='countHandler'>
              <button onClick={() => removeFromCart(id)}> - </button>
              <input value={cartItems[id]} />
              <button onClick={() => addToCart(id)}> + </button>
            </div>
        </div>
    </div>
  )
}
