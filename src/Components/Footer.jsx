import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white flex flex-col gap-8 overflow-x-hidden md:flex-row justify-around py-12 px-4 font-main">
        <div className=''>
            <div className='flex flex-col gap-8'>
                <span className='flex items-center gap-4'><img className='w-12 ' src="/logo.webp" alt="" /><h1 className='text-2xl font-bold'>RAUDRA</h1></span>
                <p className='font-semibold text-xl'>Learning Computer Science <br/> made simple.</p>
            </div>
        </div>

        <div className='flex flex-col gap-4 '>
            <p className='text-2xl font-semibold '>Contact Us</p>
            <p className='flex gap-4 items-center'><MdEmail className='text-xl'/>gate2014.ravindra@gmail.com</p>
            <p className='flex gap-4 items-center'><FaPhoneSquareAlt className='text-xl'/>+91-7780734983</p>
        </div>
      </footer>
  )
}

export default Footer