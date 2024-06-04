import React from 'react';
import PlacesCard from './PlacesCard.jsx';
import i1 from  "../../assets/i1.png";
import i2 from  "../../assets/i2.jpg";
import i3 from  "../../assets/i3.jpg";
import i4 from  "../../assets/i4.jpg";
import i5 from  "../../assets/i5.jpg";
import i6 from  "../../assets/i6.jpg";

const PlacesData=[
    {
        img:i1,
        title: "Taj Mahal",
        location:"Agra,India",
        description:"The Taj Mahal, a breathtaking white marble mausoleum in Agra, India, built by Emperor Shah Jahan, epitomizes Mughal architecture.",
        price:" ₹4000",
    },
    {
        img:i2,
        title: "Effil Tower",
        location:"Paris",
        description:"The Eiffel Tower, an iconic iron lattice tower in Paris, France, is a symbol of romance and architectural ingenuity, offering panoramic views of the city.",
        price:" ₹5000",
    },
    {
        img:i3,
        title: "Matterhorn",
        location:"Switzerland",
        description:"The Matterhorn, a majestic mountain on the Swiss-Italian border, is one of the most iconic peaks in the Alps, attracting climbers .",
        price:"₹7000",
    },
    {
        img:i4,
        title: "Tower Bridge",
        location:"London",
        description:"Tower Bridge, an iconic symbol of London, is a combined bascule and suspension bridge over the River Thames, known for its Victorian Gothic style and twin towers.",
        price:"₹9000",
    },
    {
        img:i5,
        title: "Rome",
        location:"Italy",
        description:"Rome, the capital of Italy, is a city steeped in history, known for its ancient ruins, art, and architecture, including the Colosseum, Roman Forum, and Vatican City.",
        price:" ₹10,000",
    },
    {
        img:i6,
        title: "Paro",
        location:"Bhutan",
        description:"Paro, a picturesque town in Bhutan, is known for its stunning valley, historic sites like Paro Taktsang (Tiger's Nest), and traditional Bhutanese architecture and culture.",
        price:" ₹12,000",
    }
]

const Places = () => {
  return (
    <>
     <div className='relative top-6 '>
        <div className='bg-primary/10  '>
        <div className='p-6'>
            <h1 className='text-3xl font-bold border-l-8 border-primary my-16 mx-16 px-6'>Best Places to Visit</h1>
        </div>  
        <div>
            <div className='grid grid-cols-1 sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
            {PlacesData.map((item,index)=>(
                <PlacesCard key={index}
                {...item} />
            ))}
            </div>
        </div> 
        </div>
     </div> 
    </>
  )
}

export default Places
