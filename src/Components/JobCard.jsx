import React from 'react';
import { MdArrowOutward } from "react-icons/md";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { LuClock } from "react-icons/lu";

const JobCard = ({ id, title, location, date, type, apply }) => {
  return (
    <div className="job-card font-secondary w-full border-neutral-400 border-b flex  items-center justify-between   p-8">
      <div>
      <h3 className='text-lg font-semibold flex items-center gap-4 pb-2'><PiSuitcaseSimpleBold size={28} className='p-1 bg-zinc-300 rounded'/>{title}</h3>
      <p className='text-sm flex items-center gap-2  md:text-base'><CiLocationOn/> {location}</p>
      <p className='text-sm flex items-center gap-2  md:text-base'><LuClock/> {new Date(date).toLocaleDateString()}</p>
      </div>
      <div>
      <p className='bg-zinc-200 text-sm rounded-full p-2 text-center'>{type}</p>
      <button className='bg-blue-600 my-2 font-semibold text-white rounded-full py-2 px-4 flex items-center gap-1 hover:bg-blue-800' onClick={() => apply(id)}>Apply <MdArrowOutward/></button>
      </div>
    </div>
  );
};

export default JobCard;
