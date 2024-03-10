import React from 'react';

import CountUp from 'react-countup';
import Service_section from '../Components/Service_section';

const Home = () => {
  return (
    <div className='font-main  flex flex-col   w-full  items-center overflow-x-hidden  justify-around '>
      <div className='flex bg-gray-50 min-h-screen flex-col md:flex-row-reverse px-4 md:px-8 lg:px-32'>
      <div className='lg:w-1/2 w-full md:flex justify-center hidden  items-center '>
      <img className='w-96 md:w-80 lg:w-[450px] rounded-xl' src="/hero.png" alt="" />
      </div>
      <div className='lg:w-1/2 py-8 w-full flex justify-center items-start flex-col'>
        <h1 className='text-2xl lg:text-4xl font-bold mb-4 text-black'>Elevate Your Business with  <span className=''>Tailor-Made Tech Brilliance!</span></h1>
        <p className='lg:text-lg font-medium '>Scaling Engineering Teams and Delivering Unparalleled Development Services in AI, ML, Data Science, Web and Mobile Applications</p>
        <button className='bg-zinc-900 my-8 px-4 py-2 rounded font-semibold text-xl text-white'>Join us now</button>
        <div  class="bg-gradient-to-r  my-8 from-zinc-100 to-transparent p-4 border-l-4 border-yellow-500 ">
          <span className='text-xl font-bold '>For any enquiries please  </span>
          <div className='text-2xl font-bold text-yellow-500'>WhatsApp at +91 77807 34983</div>
        </div>
        
        {/* SERVICES SECTION */}
        
      </div>
      </div>
      <Service_section />
      
      
    </div>
  );
}

export default Home;