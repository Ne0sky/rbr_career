import React from 'react'

const Service_card = ({icon, heading, desc}) => {
  return (
    <div className='p-4 w-72 bg-white h-48 text-center hover:shadow-xl shadow-lg font-main flex flex-col justify-center items-center rounded-lg'>
      <p>{icon}</p>
      <h3 className='text-2xl font-semibold py-4'>{heading}</h3>
      <p className='text-sm'>{desc}</p>
    </div>
  )
}

export default Service_card