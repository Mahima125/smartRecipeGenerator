import React from 'react'

const BlogsDetail = ({img,date,title,info,by}) => {
  return (
    <div>
      <div className=' mx-3 my-7 shadow-xl transition-all duration-500 cursor-pointer bg-white rounded-md'>
        <div className='overflow-hidden'>
            <img src={img} alt="" className='h-[200px] w-full hover:scale-110 object cover duration-500 rounded-md mx-auto '/>
        </div>
        <div className='p-4'>
             <div className='flex justify-between items-center text-gray-500'>
                <span>{date}</span>
                <span>{by}</span>
             </div>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='pt-3 text-sm  pb-3'>{info}</p>
        </div>
      </div>
    </div>
  )
}

export default BlogsDetail
