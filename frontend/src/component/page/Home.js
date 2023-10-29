import React, { useEffect, useRef, useState } from 'react'
import HomeCart from '../HomeCart'
import  {useSelector} from "react-redux";
import CartFeature from '../CartFeature';
import {GrPrevious,GrNext} from "react-icons/gr";
import FilterProduct from '../FilterProduct';
import AllProduct from '../AllProduct';

const Home = () => {
  const productData = useSelector((state)=>state.product.productList)
  

  const homeProductCartList = productData.slice(4,8)
  const homeProductCartListFruits = productData.filter(el=>el.category === "Fruits",[])
  

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef()
  const nextProduct = ()=>{
    slideProductRef.current.scrollLeft += 200

  }
  const preveProduct = ()=>{
    slideProductRef.current.scrollLeft -= 200
    
  }

  

  

  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>

        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 item-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>
            <img src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png' className='h-7 '/>
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>Swift Delivery in <span className='text-red-600 '>Your Home</span></h2>
          <p className='py-3 text-base'>Welcome to our fruity paradise! At our website, we're on a mission to tantalize your taste buds with a scrumptious assortment of natural fruity delights. Our menu boasts a vibrant selection, including fruit ice creams and mouthwatering fruit salads to delectable fruit cakes and exotic fruit chaats. From sweet to savory, we cater to every craving. Dive into the world of fruit-infused delights – we've got your taste buds covered!</p>
          <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md'>Order Now</button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          { 
            homeProductCartList[0] ? homeProductCartList.map(el=>{
              // console.log(el.image);
              return(
                <HomeCart
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
                
                />

              );

            })
            :
            loadingArray.map((el,index)=>{
              return(
                <HomeCart
                  key={index}
                  loading={"Loading..."}
              
                />
              )
            })

          }
         
        </div>
      </div>
      <div className=''>
        <div className='flex w-full items-center'>
          <h2 className='font-bold text-2xl text-slate-800 mb-4 my-1'>Fresh Fruits</h2>
          <div className='ml-auto flex  gap-4 pb-2'>
           <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious/></button>
           <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext/></button>
         </div>

        </div>
          <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
            {
              homeProductCartListFruits[0]  ? homeProductCartListFruits.map(el=>{
                return(
                  <CartFeature
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.image}
                  />


                )
              })
              
              :
              loadingArrayFeature.map((el, index)=>(<CartFeature loading= "Loading..." key={index}/>))
            }
            
          </div>
        </div>

        <AllProduct heading = {"Your Products"}/>


     
    </div>
  )
}

export default Home