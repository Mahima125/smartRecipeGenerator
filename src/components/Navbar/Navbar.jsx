import React, { useState } from 'react';
import Logo from '../../assets/Travel Logo.png';
import { NavLink } from 'react-router-dom';
import { FaCaretDown } from "react-icons/fa";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import Responsive from "./Responsive.jsx";

const DropdownLinks = [
   {
     name: "Our Services",
     link: "/#services",
   },
   {
     name: "Top Brands",
     link: "/#mobile_brands",
   },
   {
     name: "Location",
     link: "/#location",
   },
 ];


const Navbar = () => {
   
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };
  return (
    <>
    <div className="fixed top-0 right-0 left-0 border-b border-black z-[9999] ">
      <div className=' bg-gradient-to-r from-primary to-secondary'>
      <div className="container">
        <div className="flex justify-between items-center text-white">
           <p>20% off on your first booking</p>
           <p>"Travel more, worry less."</p>
        </div>
     </div>
     </div>
     <div className="container  h-16 w-full bg-white  ">
        <div className="flex justify-between items-center ">
         <div>
          <img src={Logo} alt="" className="h-14" />
         </div>
         <div className="hidden md:block">
         <ul className="flex items-center gap-8 text-black-500 justify-center ">
         <li className="py-4">
            <NavLink to="/"  className="hover:text-blue-500"> Home </NavLink>
         </li> 
         <li className="py-4">
            <NavLink to="/blogs"  className="hover:text-blue-500"> Blogs </NavLink>
         </li> 
         <li className="py-4">
            <NavLink to="/best-places"  className="hover:text-blue-500"> Best Places </NavLink>
         </li> 
         
         <li className="group relative cursor-pointer">
            <div className='flex gap-2'>
               <span>Quick Links</span>
               <span><FaCaretDown className="transition-all duration-200 hover:rotate-180 " /></span>
            </div>
            <div className="absolute  z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block shadow-md ">
               <ul className="space-y-3">
                 {DropdownLinks.map((data) => (
                        <li key={data.name}>
                          <a
                            className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                            href={data.link}
                          >
                            {data.name}
                          </a>
                        </li>
                      ))}
               </ul>
            </div>
         </li>
         </ul>
         </div>
         <div>
            <div className='flex items-center gap-4' >
               <button className=' bg-gradient-to-r from-primary to-secondary h-11 w-22 rounded-full text-xl m-3 p-2 '>Book Now</button>
               <div className="md:hidden block">
                {showMenu ? (
                  <HiMenuAlt1
                    onClick={toggleMenu}
                    className=" cursor-pointer transition-all"
                    size={30}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                )}
              </div>
            </div>
         </div>
        </div>
     </div>
     <Responsive setShowMenu={setShowMenu} showMenu={showMenu} />
    </div>
    </>
  )
}

export default Navbar
