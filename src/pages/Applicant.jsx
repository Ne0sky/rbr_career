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
    <div className='w-full  min-h-screen px-4 md:px-8 lg:px-12 mt-20 font-main py-16 md:w-[90%] lg:w-[60%] bg-zinc-100 mx-auto'>
      <h1 className='text-3xl  font-semibold mt-4'>Applicant Details</h1>
      {isLoading ? (
        <div className="flex justify-center items-center"><CircularProgress/></div>
      ) : isError ? (
        <p className='text-rose-500 bg-rose-100 p-2 rounded'>Error fetching applicant details</p>
      ) : (
        <div className='py-12 '>
          
           <p className='text-xl py-4 font-bold'>Personal Details</p>
           <div className='border-l-4 border-blue-500 p-2'>
            <p className=' font-medium text-zinc-800'>Applicant Name: <span className='text-lg font-semibold text-black'>{applicant.applicantName}</span></p>
            <p className='font-medium text-zinc-800'>Applicant ID: <span className='text-lg font-semibold text-black'> {applicant._id}</span></p>
            <p className='font-medium text-zinc-800'>Email: <span className='text-lg font-semibold text-black'> {applicant.applicantEmail}</span></p>
            <p className='font-medium text-zinc-800'>Phone: <span className='text-lg font-semibold text-black'> {applicant.applicantPhone}</span></p>
            </div>
            <div className='py-4'>
            <h2 className='text-xl  py-4 font-semibold'>Qualifications</h2>
          <div className=' span  border-l-4 border-blue-500 p-2 '>
            <div>
            {
                applicant.qualifications.map((qualification, index) => (
                    <span key={index} className='flex  bg-zinc-100  rounded-full w-auto gap-2 '>
                    <span className=''>Degree : {qualification.degree}</span>
                    <span>College : {qualification.college}</span>
                    <span>University: {qualification.university}</span>
                    </span>
                ))
            }
            </div>
          
            <p className='font-medium text-zinc-800'>Semester: <span className=' '> {applicant.semester}</span></p>
          
          </div>
          
          </div>
          <div className='py-8'>
            <h2 className='text-xl font-semibold'>Experience</h2>
            <p className='text-lg '>{applicant.yearsOfExperience} years</p>
          </div>
          <div>
          <h2 className='text-xl font-semibold'>Resume</h2>
            <Link className='bg-blue-500 p-2 my-4 w-36 rounded text-white justify-center flex items-center gap-2' to={applicant.resumeUrl}>Download  <FaFileDownload/></Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applicant;
