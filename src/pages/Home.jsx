import React from 'react';
import travel from '../assets/travel.mp4';
import Hero from '../components/Hero/Hero.jsx';
import Places from '../components/Places/Places.jsx';
import Picture from '../components/Picture/Picture.jsx';
import Blogs from './Blogs.jsx';
import Picture2 from '../components/Picture2/Picture2.jsx';
import Banner from '../components/Banner/Banner.jsx'
import Testimonial from '../components/Testimonial/Testimonial.jsx';

const Home = () => {
  return (
    <>
      <div>
        <div className='h-[600px] relative  '>
          <video autoPlay muted loop className=" absolute  h-[600px] w-full object-cover z-[-1]" >
            <source src={travel} type='video/mp4'/>
          </video>
          <Hero/>
        </div>
        <Places/>
        <Picture/>
        <Blogs/>
        <Banner />
        <Picture2/>
        <Testimonial/>
      </div>
    </>
  )
}

export default Home
