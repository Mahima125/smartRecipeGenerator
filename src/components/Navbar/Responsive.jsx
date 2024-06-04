import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavbarLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Blogs",
      link: "/blogs",
    },
    {
      name: "Best Places",
      link: "/best-places",
    },
  ];

const Responsive = ({showMenu, setShowMenu}) => {
  return (
    <div className={`${showMenu ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-full w-[60%] flex-col justify-between bg-gradient-to-r from-primary to-secondary px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}>
      <div className="flex-col space-y-11">
      <div className='flex gap-5'>
          <div>
          <FaUserCircle size={60} />
          </div>
          <div className='pt-2'>
            <h1 className='text-white'>Hello</h1>
            <h2 >Explore More...</h2>
          </div>
      </div>
      <div className='mt-0'>
        <ul  className=' text-white space-y-8 text-xl  '>
         { NavbarLinks.map((data) =>(
             <li>
              <Link to={data.link} onclick={() =>setShowMenu(false)} className='hover:text-black' >{data.name}</Link>
             </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  )
}

export default Responsive
