import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../cartProduct'
import emptyCartImage from "../../assets/empty.gif"
import toast from 'react-hot-toast'
import {loadStripe} from "@stripe/stripe-js"
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const productCartItem = useSelector((state)=>state.product.cartItem)
    

    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    
    

    const totalQty = productCartItem.reduce((acc,curr)=> acc + parseInt(curr.qty),0)
    const totalPrice = productCartItem.reduce((acc,curr)=> acc + parseInt(curr.total),0)


    

    const handlePayment = async()=>{
        if(user.email){


        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`,{
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(productCartItem)

        })
        if(res.statusCode === 500) return;
        const data = await res.json()
        

        toast("Redirect To Payment Gateway...!")
        stripePromise.redirectToCheckout({sessionId : data})
    } else{
        toast("You are not Login!")
        setTimeout(()=>{
            navigate("/login")

        },1000)
    }
        
    }
  return (
  
  
  <div className='p-4 md:p-8'>
      <h2 className='text-xl md:text-2xl font-bold text-slate-600 mb-4'>Your Cart Items</h2>

        {
            productCartItem[0] ?

         <div className='flex flex-wrap gap-4'>
            {/* display cart items */}
            <div className='w-full md:w-2/3'>
                {
                    productCartItem.map(el=>{
                        return(
                            <CartProduct
                             key={el._id}
                             id={el._id}
                             name={el.name}
                             image={el.image}
                             category={el.category}
                             qty={el.qty}
                             total={el.total}
                             price={el.price}
                             
                             />
                        )
                    })
                }
                
                
            </div>

            {/* total cart items */}
            <div className='w-full md:w-1/3'>
                <h2 className='bg-blue-500 text-white p-2 text-lg mb-4'>Order Summary</h2>
                <div className='flex w-full py-2 border-b'>
                  <p>Total Qty:</p>
                  <p className='ml-auto font-bold'>{totalQty}</p>
                </div>
                <div className='flex w-full py-2 border-b'>
                  <p>Total Price:</p>
                  <p className='ml-auto font-bold'>
                     <span className='text-red-500 px-1'>₨</span> {totalPrice}
                  </p>
            </div>
            <button
              className='bg-red-500 w-full text-lg font-bold py-2 text-white cursor-pointer'
              onClick={handlePayment}
            >
              Payment
            </button>
            </div>

        </div>
        :<>

        <div className='flex justify-center items-center flex-col'>
          <img src={emptyCartImage} className='w-full max-w-sm' alt='Empty Cart' />
          <p className='text-slate-500 text-xl md:text-2xl font-bold mt-4'>Empty Cart</p>
        </div>

          
        </>
}
    </div>

  </>
  )
}

export default Cart