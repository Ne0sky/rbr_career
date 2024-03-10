import React from 'react';

const JobCard = ({ id, title, location, date, type, apply }) => {
  return (
    <div className="job-card my-4 bg-zinc-100 rounded-md p-2">
      <h3>{title}</h3>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Type:</strong> {type}</p>
      <button className='bg-lime-500 rounded px-4 py-1' onClick={() => apply(id)}>Apply Now</button>
    </div>
  );
};

export default JobCard;
