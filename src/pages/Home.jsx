import React from 'react';
import Service_section from '../Components/Service_section';
import Marquee from "react-fast-marquee";
import useGetJobs from '../hooks/useGetJobs';
import JobCard from '../Components/JobCard';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import teamData from '../data/Team';
import { MdArrowOutward } from "react-icons/md";
import TeamCard from '../Components/TeamCard';

const Home = () => {
  const { data: jobs, isLoading, isError } = useGetJobs();
  const handleApply = (_id) => {
    console.log('Applying for job with ID:', _id);
    window.open(`/job/${_id}`, '_blank');
  };
  return (
    <div className='font-main  flex flex-col px-2 md:px-4 lg:px-8  w-full  items-center overflow-x-hidden  justify-around '>
      <div className='flex bg-gray-50 min-h-screen flex-col md:flex-row-reverse px-4 md:px-8 lg:px-32'>
      <div className='lg:w-1/2 w-full md:flex justify-center hidden  items-center '>
      <img className='w-96 md:w-80 lg:w-[450px] rounded-xl' src="/hero.png" alt="" />
      </div>
      <div className='lg:w-1/2 py-8 w-full flex justify-center items-start flex-col'>
        <h1 className='text-2xl lg:text-4xl  font-bold mb-4 text-black'>Elevate Your Business with  <span className=''>Tailor-Made Tech Brilliance!</span></h1>
        <p className='lg:text-lg font-medium '>Scaling Engineering Teams and Delivering Unparalleled Development Services in AI, ML, Data Science, Web and Mobile Applications</p>
        <button className='bg-zinc-900 my-8 px-4 py-2 rounded font-semibold text-xl text-white'>Join us now</button>
        <div  class="bg-gradient-to-r  my-4 from-zinc-100 to-transparent p-4 border-l-4 border-blue-500 ">
          <span className='text-xl font-bold '>For any enquiries please  </span>
          <div className='text-xl font-bold text-blue-500'>WhatsApp at <span className='whitespace-nowrap'>+91 77807 34983</span></div>
        </div>
        
        <Marquee className='bg-zinc-200 py-2 font-bold text-xl' pauseOnHover >
          <p className='px-2'>Hiring going on for full time positions and internships. Apply now! </p>
        </Marquee>
      </div>
   
      </div>
      
      
      {/* Job Openings Section*/}
      <div className='w-full md:w-[80%] lg:w-[70%]'>
          {
            isLoading ? (
              <div className="flex items-center justify-center w-full h-screen">
                <CircularProgress />
              </div>
            ) : isError ? (
              <div>Error: {isError.message}</div>
            ) : jobs ? (
              <div className='flex w-full  items-center flex-col my-16 gap-6'>
              <p className='text-3xl font-semibold'>Recent Job Openings</p>
              <div className='flex flex-col md:flex-row gap-4 w-full'>
              {jobs.slice(jobs.length-2, jobs.length).map((job) => (
                <JobCard className='w-80' key={job._id} title={job.title} location={job.location} date={job.postedOn} openings={job.openings} type={job.type} apply={() => handleApply(job._id)} />
              ))}
              </div>
              <Link to='/careers' className='bg-zinc-600 w-48 text-white py-2 px-4 rounded-md text-center font-semibold flex items-center gap-1 justify-center hover:bg-zinc-800'>View All Jobs <MdArrowOutward className='text-xl'/></Link>
              </div>
              
            ) : null

          }
      </div>
      <Service_section />
      {/* Team Section */}
      <div className='py-12 flex flex-col items-center justify-center'>
        <h3 className='text-3xl font-bold'>Meet Our Team</h3>
        <p className='text-xl font-medium py-4'>We have a dedicated team commited to supporting you and your business</p>
        <div className='flex flex-wrap py-12 justify-center items-center gap-4'>
          {teamData.map((member) => (
            <TeamCard key={member.id} name={member.name} role={member.role} desc={member.desc} image={member.image} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;