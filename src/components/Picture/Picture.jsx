import React from 'react'
import i7 from "../../assets/i7.jpg";

const Picture = () => {
  return (
    <div className='overflow-hidden'>
      <img src={i7} alt="" className='object-cover shadow-lg transition-all duration-500 w-full h-[300px] hover:scale-110 mt-7' />
    </div>
  )
}

export default Picture
