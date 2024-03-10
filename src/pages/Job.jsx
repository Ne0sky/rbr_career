import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import useGetJobById from '../hooks/useGetJobbyId';


const Job = () => {
  const { id } = useParams();
  const { data: job, isLoading, isError } = useGetJobById(id);
  const handleApply = (id) => {
    console.log('Applying for job with ID:', id);
    window.open(`/apply/${id}`, '_blank');
  };
  return (
    <div className='w-full py-16 md:w-[90%] lg:w-[80%] bg-zinc-100 mx-auto'>
      <button onClick={() => handleApply(id)}>Apply Now</button>
      <h1 className='text-3xl font-semibold'>Job Details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching job</p>
      ) : (
        <div>
          <p>Job ID: {job._id}</p>
          <p className='text-2xl font-semibold'>Title: {job.title}</p>
          <p className='text-xl'>Description: {job.description}</p>
        </div>
      )}
    </div>
  );
};

export default Job;
