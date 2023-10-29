import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addCartItem } from '../../redux/productSlice'
import AllProduct from '../AllProduct'

const Menu = () => {
  const {filterby} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector(state=>state.product.productList)

  const productDisplay = productData.filter(el=>el._id === filterby)[0]
  

  const handleAddCartProduct =(e)=>{
    // e.stopPropagation()
    dispatch(addCartItem(productDisplay))
    

  }

  const handleBuy = ()=>{
    dispatch(addCartItem(productDisplay))
     navigate("/cart")
  }

  return (
    <div className='p-2 md:p-4'>
      <div className='w-full max-w-4xl m-auto md:flex bg-white '>
        <div className=' max-w-sm overflow-hidden w-full p-5'>
          <img src={productDisplay.image} className= "hover:scale-105 transition-all h-full"/>
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className='font-semibold text-slate-600 capitalize text-2xl md:text-4xl mt-4'>{productDisplay.name}</h3>
          <p className='text-slate-500 font-medium text-2xl'>{productDisplay.category}</p>
          <p className='font-bold md:text-2xl'> <span className='text-red-500 px-1'>₨</span>
           <span>{productDisplay.price}</span></p>
          <div className=' flex gap-3'>
           <button className='bg-yellow-500 py-1 my-6 mt-2 rounded hover:bg-yellow-600 min-w-[100px]' onClick={handleBuy}>Buy</button>
           <button onClick={handleAddCartProduct} className='bg-yellow-500 py-1 my-6 mt-2 rounded hover:bg-yellow-600 min-w-[100px]'>Add to Cart</button>
          </div>
          <div className='pb-4'>
            <p className='text-slate-600 font-medium'>Description : </p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
        
      </div>
      <AllProduct heading={"Related Products"}/>
    </div>
  )
}

export default Menu