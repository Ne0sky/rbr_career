import React from 'react';
import { useParams } from 'react-router-dom';
import useGetApplicantById from '../hooks/useGetApplicantById';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaFileDownload } from "react-icons/fa";

const Applicant = () => {
  const { id } = useParams();
  const { data: applicant, isLoading, isError } = useGetApplicantById(id);

  return (
    <div className='w-full px-4 md:px-8 lg:px-12 font-main py-16 md:w-[90%] lg:w-[60%] bg-zinc-100 mx-auto'>
      <h1 className='text-3xl  border-l-4 border-blue-500 p-2 nt-semibold mt-4'>Applicant Details</h1>
      {isLoading ? (
        <div className="flex justify-center items-center"><CircularProgress/></div>
      ) : isError ? (
        <p className='text-rose-500 bg-rose-100 p-2 rounded'>Error fetching applicant details</p>
      ) : (
        <div className='py-12'>
           <p className='text-xl py-4 font-bold'>Personal Details</p>
            <p className=' font-medium text-zinc-800'>Applicant Name: <span className='text-lg font-semibold text-black'>{applicant.applicantName}</span></p>
            <p className='font-medium text-zinc-800'>Applicant ID: <span className='text-lg font-semibold text-black'> {applicant._id}</span></p>
            <p className='font-medium text-zinc-800'>Email: <span className='text-lg font-semibold text-black'> {applicant.applicantEmail}</span></p>
            <p className='font-medium text-zinc-800'>Phone: <span className='text-lg font-semibold text-black'> {applicant.applicantPhone}</span></p>
            <h2 className='text-xl  pt-4 font-semibold'>Qualifications</h2>
          <div className='pb-2 span flex '>
            
            {
                applicant.qualifications.map((qualification, index) => (
                    <span key={index} className='flex  bg-zinc-100 p-2 rounded-full w-auto gap-2 '>
                    <span className=''>Degree : {qualification.degree}</span>
                    <span>College : {qualification.institute}</span>
                    </span>
                ))
            }
          </div>
          
          <div>
          <h2 className='text-xl font-semibold'>Resume</h2>
            <Link className='bg-blue-500 p-2 w-36 rounded text-white justify-center flex items-center gap-2' to={applicant.resumeUrl}>Download  <FaFileDownload/></Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applicant;
