
import React from 'react'

const TeamCard = ({id, name, role, image, desc}) => {
    return (
        <div key={name.id} className='flex flex-col w-72 rounded-lg  items-center  shadow-lg shadow-neutral-200 gap-4'>
        <div className='w-full h-32 py-4 bg-neutral-400 rounded-lg  relative'>
                <img
                        className='w-32 h-32 rounded-full absolute left-1/2 -bottom-28 transform -translate-x-1/2 -translate-y-1/2'
                        src={image}
                        alt={name}
                />
        </div>
        <div className='pt-12 text-center pb-8 px-4'>
        <p className='text-lg font-semibold'>{name}</p>
        <p className='text-gray-500 text-sm py-4 '>{desc}</p>
        <p className=' font-bold'>{role}</p>
        </div>
    </div>
    )
}

export default TeamCard