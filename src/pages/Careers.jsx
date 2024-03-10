import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import DataTable from '../Components/DataTable'
import { SiGoogleclassroom } from "react-icons/si";
import JobCard from '../Components/JobCard';
import useGetJobs from '../hooks/useGetJobs';
import CircularProgress from '@mui/material/CircularProgress';
const Careers = () => {
  const { data: jobs, isLoading, isError } = useGetJobs();
  

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    {
      field: 'ApplyButton',
      headerName: '',
      width: 120,
      renderCell: (params) => (
        <button className='bg-lime-500 rounded px-2 py-1' onClick={() => handleApply(params.row.id)}>Learn More</button>
      ),
    },
  ];
 
  const handleApply = (id) => {
    console.log('Applying for job with ID:', id);
    window.open(`/job/${id}`, '_blank');
  };
  const getRowId = (row) => row._id; 
  return (
    <div className='font-main  flex flex-col w-full  items-center overflow-x-hidden  justify-center'>
      <div className='bg-slate-100  w-full banner text-center overflow-x-hidden space-y-8 py-16'>
        <p className='text-4xl font-semibold'>Become part of our team!</p>
        
        <p className='text-2xl'>Browse through our careers to be a part of Raudra Technologies</p>
      </div>
      <div className='w-full py-8  px-1 flex flex-col justify-center items-center'>
        <p className='text-2xl font-semibold py-8'>Job Openings</p>
        {isLoading ? (
          <CircularProgress/>
        ) : isError ? (
          <p>Error fetching data</p>
        ) : jobs ? (
          console.log(jobs),
          <DataTable columns={columns} rows={jobs} getRowId={getRowId} />
        ) : null}
        <div className=' w-full sm:flex md:hidden lg:hidden'>
          {jobs && jobs.map((job) => (
            <JobCard key={job.id} title={job.title} location={job.location} date={job.date} type={job.type} apply={() => handleApply(job.id)} />
          ))}
        </div>
      </div>
      <div className='flex w-full py-8 justify-center flex-col items-center px-4'>
        <p className='text-2xl font-semibold pb-8'>Why should you join Raudra Technologies?</p>
        <div className='flex flex-col md:flex-row justify-center py-8 items-center gap-4 w-[90%] '>
          <div className='max-w-1/3 flex flex-col justify-center items-center '>
            <SiGoogleclassroom className='text-5xl text-blue-500'/>
            <p className='text-xl font-bold'>Exciting Projects & Clients</p>
            <p>we foster an innovative work culture where employees are encouraged to think creatively and contribute their ideas to solve complex problems</p>
          </div>
          <div className='max-w-1/3 flex flex-col justify-center items-center'>
            <SiGoogleclassroom className='text-5xl text-blue-500'/>
            <p className='text-xl font-bold'>Exciting Projects & Clients</p>
            <p>we foster an innovative work culture where employees are encouraged to think creatively and contribute their ideas to solve complex problems</p>
          </div>
          <div className='max-w-1/3 flex flex-col justify-center items-center'>
            <SiGoogleclassroom className='text-5xl text-blue-500'/>
            <p className='text-xl font-bold'>Exciting Projects & Clients</p>
            <p>we foster an innovative work culture where employees are encouraged to think creatively and contribute their ideas to solve complex problems</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Careers;