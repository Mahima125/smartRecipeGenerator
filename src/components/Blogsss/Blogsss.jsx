import React from 'react';
import BlogsDetails from "./BlogsDetail.jsx";
import i8 from "../../assets/i8.jpg";
import i9 from "../../assets/i9.jpg";
import i10 from "../../assets/i10.jpg";
import i11 from "../../assets/i11.jpg";
import i12 from "../../assets/i12.jpg";
import i13 from "../../assets/i13.jpg";

const BlogsData=[
  {
    img: i8,
    date:"April,2024",
    by:"by Steve",
    title:"Top places in India",
    info:"India's top places: Taj Mahal, Jaipur, Kerala backwaters, Goa beaches, Varanasi, Delhi, Mumbai, Rajasthan, Himachal Pradesh, and Rishikesh.",
  },
  {
    img: i9,
    date:"July,2019",
    by:"by Vikas",
    title:"Top places to visit in USA",
    info:"USA's top places: New York City, Grand Canyon, Yellowstone, San Francisco, Las Vegas, Miami, Hawaii, Washington D.C., Chicago, and Los Angeles.",
  },
  {
    img: i10,
    date:"Sept,2004",
    by:"by Modi",
    title:"Top places to visit in Japan",
    info:"Japan's top places: Tokyo, Kyoto, Osaka, Mount Fuji, Hiroshima, Nara, Sapporo, Okinawa, Nikko, and Hakone.",
  },
  {
    img: i11,
    date:"June,1999",
    by:"by Dhruv",
    title:"Top places to visit in Italy",
    info:"Italy's top places: Rome, Venice, Florence, Milan, Amalfi Coast, Cinque Terre, Tuscany, Naples, Sicily, and the Dolomites.",
  },
  {
    img: i12,
    date:"Dec,2020",
    by:"by Nidhi",
    title:"Top places to visit in Canada",
    info:"Canada's top places: Banff, Vancouver, Toronto, Montreal, Niagara Falls, Quebec City, Ottawa, Jasper, Whistler, and Prince Edward Island.",
  },
  {
    img: i13,
    date:"Feb,1987",
    by:"Nehru",
    title:"Top places to visit in Pakistan",
    info:"Pakistan's top places: Lahore, Islamabad, Karachi, Hunza Valley, Swat Valley, Skardu, Murree, Gilgit, Mohenjo-Daro, and Fairy Meadows.",
  },
]

const Blogsss = () => {
  return (
    <>
      <div className='relative top-6 '>
        <div className='bg-primary/10 '>
        <div className='p-6'>
            <h1 className='text-3xl font-bold border-l-8 border-primary my-16 mx-16 px-6 animate-bounce'>Our latest Blogs</h1>
        </div>  
        <div>
            <div className='grid grid-cols-1 sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
            {BlogsData.map((item,index)=>(
                <BlogsDetails key={index}
                {...item} />
            ))}
            </div>
        </div> 
        </div>
     </div> 
    </>
  )
}

export default Blogsss
