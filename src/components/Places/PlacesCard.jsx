import React from 'react';
import { IoLocationSharp } from "react-icons/io5";

const PlacesCard = ({img,title,location,description,price}) => {
  return (
    <>
      <div className=' mx-3 my-7 shadow-xl transition-all duration-500 cursor-pointer bg-white rounded-md'>
        <div className='overflow-hidden'>
            <img src={img} alt="" className='h-[200px] w-full hover:scale-110 object cover duration-500 rounded-md mx-auto '/>
        </div>
        <div className='p-4'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <h2 className='text-md text-gray-500 flex gap-2 mt-2'><IoLocationSharp />{location}</h2>
            <p className='pt-3 text-sm border-b-2 border-gray-400 pb-3'>{description}</p>
            
            <span className=' text-lg font-bold p-4'>{price}</span>
        </div>
      </div>
    </>
  )
}

export default PlacesCard
