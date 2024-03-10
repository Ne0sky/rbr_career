import React from 'react';
import { useParams } from 'react-router-dom';
import useGetJobById from '../hooks/useGetJobbyId';
import { CircularProgress } from '@mui/material';

const Job = () => {
  const { id } = useParams();
  const { data: job, isLoading, isError } = useGetJobById(id);

  const handleApply = (id) => {
    console.log('Applying for job with ID:', id);
    window.open(`/apply/${id}`, '_blank');
  };

  return (
    <div className='w-full px-4 font-main py-16 md:w-[90%] lg:w-[80%] mx-auto'>
      
      <h1 className='text-3xl font-semibold mt-4'>Job Details</h1>
      {isLoading ? (
        <p><CircularProgress/></p>
      ) : isError ? (
        <p className='text-rose-500 bg-rose-100 p-2 rounded'>Error fetching job</p>
      ) : (
        <div className='py-12 '>
        
          <div className='border-l-2  border-blue-500 p-4 bg-zinc-100'>
          <p className='text-2xl font-semibold'>Job Title: {job.title}</p>
          <p className='font-semibold'>Job Requisition ID : {job._id}</p>
          <p className='font-semibold'>Type: {job.type}</p>
          </div>
          <div className='pb-2 pt-4'>
          <h2 className='text-xl font-semibold'>Description</h2>
          <p className='text-lg '> {job.description.responsibilities}</p>
          </div>
          <div className='py-2'>
          <h2 className='text-xl font-semibold'>Requirements</h2>
          <p className='text-lg '>{job.description.requirements}</p>
          </div>
          <div className='py-2'>
            <h2 className='text-xl font-semibold'>Salary</h2>
            <p className='text-lg '> {job.description.salary}</p>
          </div>
          <div className='py-2'>
            <h2 className='text-xl font-semibold'>Location</h2>
            <p className='text-lg '> {job.location}</p>
          </div>
          
          <p className=''>Posted On: {new Date(job.postedOn).toLocaleDateString()}</p>
          <button onClick={() => handleApply(id)} className='bg-blue-500 my-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Apply Now
      </button>
        </div>
      )}
      
    </div>
  );
};

export default Job;
