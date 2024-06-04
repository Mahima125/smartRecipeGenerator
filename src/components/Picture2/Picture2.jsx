import React from 'react'
import i14 from "../../assets/i14.jpg";

const Picture2 = () => {
  return (
    <div className='overflow-hidden'>
      <img src={i14} alt="" className='object-cover shadow-lg transition-all duration-500 w-full h-[300px] hover:scale-110 mt-7' />
    </div>
  )
}

export default Picture2
