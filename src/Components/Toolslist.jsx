import React from 'react'
import Marquee from 'react-fast-marquee'
import { FaNodeJs } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";
import { FaDocker } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { TbBrandReactNative } from "react-icons/tb";
import { SiRedis } from "react-icons/si";
import { SiSpringboot } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaAws } from "react-icons/fa";
import { FaJenkins } from "react-icons/fa";


const Toolslist = () => {
  return (
    <div className='w-full py-8  mt-16'>
        <Marquee gradient gradientColor='#F5F0EA'>
           
            <FaNodeJs className='text-6xl mx-6  text-green-500'/>
            <FaReact className='text-6xl mx-6  text-blue-500'/>
            <IoLogoJavascript className='text-6xl mx-6  text-yellow-500'/>
            <FaHtml5 className='text-6xl mx-6  text-red-500'/>
            <FaCss3 className='text-6xl mx-6  text-blue-500'/>
            <FaDocker className='text-6xl mx-6  text-blue-500'/>
            <SiMongodb className='text-6xl mx-6  text-green-500'/>
            <SiMysql className='text-6xl mx-6  text-blue-500'/>
            <FaPython className='text-6xl mx-6  text-yellow-500'/>
            <TbBrandReactNative className='text-6xl mx-6  text-black'/>
            <SiRedis className='text-6xl mx-6  text-red-500'/>
            <SiSpringboot className='text-6xl mx-6  text-blue-500'/>
            <BiLogoPostgresql className='text-6xl mx-6  text-blue-500'/>
            <FaAws className='text-6xl mx-6  text-yellow-500'/>
            <FaJenkins className='text-6xl mx-6  text-red-500'/>

        </Marquee>
    </div>
  )
}

export default Toolslist