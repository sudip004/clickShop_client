import React, { useContext, useState } from 'react'
import "./CartItems.css"
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from "../Assets/cart_cross_icon.png"
import Payment from '../payment/Payment'
import { loadStripe } from '@stripe/stripe-js'

const CartItems = () => {

    const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

    const [open,setOpen] = useState(false)
    
    // const makePayment = async() => {
    //     const stripe = await loadStripe('pk_test_51PkhhFP5IdnNo5MZg01jpNerPneg4oMQvbIOfFNTjpCAdj76ApJK2fFPCFBA0wDQk5JXXXZGgs3aofxsd4w7iGGi00vc6dEvaG');

    //     const carts = all_product.filter((e)=>e.id === cartItems[e.id])
    //     console.log(carts);
        

    //     const body ={
    //         products: carts
    //     }
    //     const header={
    //         "Content-Type": "application/json"
    //     }

    //     const response = await fetch(`${import.meta.env.VITE_BASE_URL}/payment`, {
    //         method: 'POST',
    //         headers: header,
    //         body: JSON.stringify(body)
    //     })

    //     const session = await response.json()
    //    console.log(session);
       
        

    //   const result= stripe.redirectToCheckout({ sessionId: session.id });

    //     if(result.error){
    //         console.log(result.error.message);
    //     }
    // }

    const handeldrawer = () => {
        setOpen(pre=>!pre)
    }

    return (
        <>
        {
            open ? (<>
                <Payment ammount={getTotalCartAmount()}/>
            </>):null
        }
            <div className='cartitems'>
                <div className="cartitems-format-main">
                    <p>Products</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />

                <hr />
                {all_product.map((e,i) => {
                    if (cartItems[e.id] > 0) {
                        return <div key={i}> 
                            <div className="cartitems-format cartitems-format-main">
                                <img className='carticon-product-icon' src={e.image} alt="" />
                                <p>{e.name} </p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} alt="" onClick={() => { removeFromCart(e.id) }} />
                            </div>
                        </div>
                    }
                    return null
                })}
                <div className="cartitems-down">
                    <div className="cartitems-total">
                        <h1>Cart Total</h1>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>

                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>

                        <button onClick={handeldrawer}>PROCEED TO PAYMENT</button>
                    </div>

                    <div className="cartitems-promocode">
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cartitem-promobox">
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItems