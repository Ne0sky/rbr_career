import React from 'react';
import Service_section from '../Components/Service_section';
import Marquee from "react-fast-marquee";
import useGetJobs from '../hooks/useGetJobs';
import JobCard from '../Components/JobCard';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, NavLink } from 'react-router-dom';
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
    <div className='font-main  flex flex-col px-4   w-full  items-center overflow-x-hidden  justify-center '>
      <div className='flex hero w-screen min-h-screen justify-center flex-col md:flex-row-reverse px-4 md:px-8 lg:px-32'>
      <div className='lg:w-1/2 w-full md:flex justify-center hidden  items-center '>
      <img className='w-96 md:w-80 lg:w-[450px] rounded-xl' src="/hero.png" alt="" />
      </div>
      <div className='lg:w-1/2 py-8 w-full flex justify-center items-start flex-col'>
        <h1 className='text-2xl lg:text-4xl border-l-4 border-blue-800 px-4 font-bold mb-4 text-black'>Elevate Your Business with  <span className='font-extrabold text-blue-800'>Tailor-Made Tech Brilliance!</span></h1>
        <p className='lg:text-xl font-medium py-8'>Scaling Engineering Teams and Delivering Unparalleled Development Services in AI, ML, Data Science, Web and Mobile Applications</p>
        <NavLink to='/careers' className='bg-blue-800 hover:bg-blue-900 shadow-xl shadow-blue-300  px-4 py-4  rounded font-semibold text-xl text-white'>Join us now</NavLink>
        {/* <div  class="bg-gradient-to-r  my-4 from-zinc-100 to-transparent p-4 border-l-4 border-blue-500 ">
          <span className='text-xl font-bold '>For any enquiries please  </span>
          <div className='text-xl font-bold text-blue-500'>WhatsApp at <span className='whitespace-nowrap'>+91 77807 34983</span></div>
        </div> */}
        
        
      </div>
   
      </div>
      
      
      {/* Job Openings Section
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
      </div> */}
      <Service_section />
      {/* More than developers */}
      <h3 className='text-3xl font-bold'>More than just Developers !</h3>

      <div className='flex flex-col py-16 lg:flex-row justify-center items-center'>
        <div className='w-full lg:w-1/2 grid grid_cols-1 gap-4 md:grid-cols-2 justify-center items-center '>
          <div className=''>
            <h1 className='text-xl font-bold'>Engineering Mindset</h1>
            <p className='py-8'>Every developer at Primathon works with an Engineering mindset. This allows us to work on creative solutions and build our own libraries uniquely.</p>
          </div>
          <div className=''>
            <h1 className='text-xl font-bold'>Engineering Mindset</h1>
            <p className='py-8'>From start to end, we follow agile methodology on our projects. We execute the process for continuous improvement discovering solutions for you.</p>
          </div>
          <div className=''>
            <h1 className='text-xl font-bold'>Engineering Mindset</h1>
            <p className='py-8'>You don’t have to think about dealing with any delays. Our expert team is confident to design, develop, and deliver on time for a seamless experience.</p>
          </div>
          <div className=''>
            <h1 className='text-xl font-bold'>Engineering Mindset</h1>
            <p className='py-8'>How end users interact with the product becomes extremely important in this journey. We understand and value this in our software building process.</p>
          </div>
        </div>
        <div className='w flex justify-center items-center'>
          <img className='w-96' src="/more_than_dev.svg" alt="" />
        </div>
      </div>
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