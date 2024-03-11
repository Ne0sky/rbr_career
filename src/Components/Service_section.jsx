import React from 'react'
import { SiGoogleclassroom } from "react-icons/si";
import Service_card from './Service_card';
import { FaYoutube } from "react-icons/fa";
import { LuSendToBack } from "react-icons/lu";

const Service_section = () => {
  return (
    <section className='flex py-12 justify-center flex-col bg-neutral-100 w-screen items-center px-4'>
          <h2 className='text-3xl py-4  font-bold '>Services</h2>
          <p className='text-xl font-medium pb-8'>Where can we take your business? Well, everywhere! This is how we do it.</p>
          <div className='flex flex-col md:flex-row justify-center items-center gap-4 py-4'>
          <Service_card icon={<LuSendToBack className='text-5xl text-blue-500' />} heading='Web Development' desc='We provide the best youtube services'/>
          <Service_card icon={<SiGoogleclassroom className='text-5xl text-blue-500' />} heading='App Development' desc='We provide the best youtube services'/>
          <Service_card icon={<SiGoogleclassroom className='text-5xl text-blue-500' />} heading='SEO Management' desc='We provide the best youtube services'/>
          </div>
      </section>
  )
}

export default Service_section