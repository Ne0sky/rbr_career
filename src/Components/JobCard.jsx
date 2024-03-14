import React from 'react';
import { MdArrowOutward } from "react-icons/md";


const JobCard = ({ id, title, location, date, type, apply, openings }) => {
  return (
    <div className="job-card w-full bg-zinc-100 border-l-4 border-blue-600 flex my-4 items-center justify-between shadow-md  rounded-md p-4">
      <div>
      <h3 className='text-xl font-bold pb-2'>{title}</h3>
      <p className='text-sm md:text-base'><strong>Location-</strong> {location}</p>
      <p className='text-sm md:text-base'><strong>Posted on-</strong> {new Date(date).toLocaleDateString()}</p>
      </div>
      <div>
      <p className='bg-zinc-300 text-sm rounded-full p-1 text-center'>{type}</p>
      <button className='bg-blue-500 my-2 font-semibold text-white rounded-full px-4 py-1 flex items-center gap-1 hover:bg-blue-800' onClick={() => apply(id)}>Apply <MdArrowOutward/></button>
      </div>
    </div>
  );
};

export default JobCard;
