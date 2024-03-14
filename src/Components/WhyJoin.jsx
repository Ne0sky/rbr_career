import React from 'react'
import Service_card from './Service_card'


const WhyJoin = () => {
  return (
    <div className='flex flex-col justify-center items-center px-4 py-16'>
        <h3 className='text-2xl font-bold py-2 text-center'>Why should you join Raudra Technologies ?</h3>
        <div className='bg-blue-500 w-40 h-1'></div>
        <div class="flex flex-col md:flex-row py-16 justify-center gap-8">
          <Service_card src='/innovation.png' heading='Innovation' desc='Work On Technologies Of The Future, Stay Connected To Everything That Is Happening '/>
          <Service_card src='/growth.png' heading='Growth' desc='Our Culture Is Built On The Philosophy Of Mutual Growth And Becoming The Best Version Of Yourself'/>
          <Service_card src='/balance.png' heading='Balance' desc='We Believe In Balance. Working, Learning And Fun Are Equally Important. '/>
        </div>
      </div>
  )
}

export default WhyJoin