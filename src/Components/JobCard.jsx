import React from 'react';


const JobCard = ({ id, title, location, date, type, apply, openings }) => {
  return (
    <div className="job-card w-full flex my-4 items-center justify-between bg-zinc-200   rounded-md p-4">
      <div> <h3 className='text-xl font-bold pb-2'>{title}</h3>
      <p><strong>Location-</strong> {location}</p>
      <p><strong>Posted on-</strong> {new Date(date).toLocaleDateString()}</p>
      <p><strong>Openings-</strong> {openings}</p>
      </div>
      <div>
      <p className='bg-zinc-400 rounded-full p-1 text-center'>{type}</p>
      <button className='bg-blue-500 my-2 font-semibold text-white rounded px-4 py-1' onClick={() => apply(id)}>Learn More</button>
      </div>
    </div>
  );
};

export default JobCard;
