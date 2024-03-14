import React, { useState, useEffect } from 'react';
import DataTable from '../Components/DataTable';
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import JobCard from '../Components/JobCard';
import useGetJobs from '../hooks/useGetJobs';
import CircularProgress from '@mui/material/CircularProgress';
import Service_card from '../Components/Service_card';
import { IoSearch } from "react-icons/io5";

const Careers = () => {
  const { data: jobs, isLoading, isError } = useGetJobs();
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('');

  useEffect(() => {
    if (jobs) {
      setFilterData(jobs);
    }
  }, [jobs]);
  

  const filterJobs = () => {
    if (jobs) {
      const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        job.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
        job.type.toLowerCase().includes(searchType.toLowerCase())
      );

      setFilterData(filteredJobs);
    }
  };
 
  const resetFilters = () => {
    setSearchQuery('');
    setSearchLocation('');
    setSearchType('');
    setFilterData(jobs.slice(page * n, (page + 1) * n));
  }

  const handleApply = (_id) => {
    console.log('Applying for job with ID:', _id);
    window.open(`/job/${_id}`, '_blank');
  };
  
  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    {
      field: 'ApplyButton',
      headerName: '',
      width: 120,
      renderCell: (params) => (
        <button className='bg-lime-500 rounded px-2 py-1' onClick={() => handleApply(params.row._id)}>Learn More</button>
      ),
    },
  ];

  return (
    <div className='font-main flex flex-col relative w-full h-full items-center overflow-x-hidden mt-20'>
      {/* Banner section */}
      <div className='bg-gray-200 flex relative w-full h-72 banner text-center overflow-x-hidden'>
        <img src="/career.jpg" className='object-cover h-72 w-full filter brightness-50 saturate-150   z-0' alt="" />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
          <p className='text-2xl md:text-3xl lg:text-4xl w-full font-semibold'>Become part of our team!</p>
          <p className='text-xl hidden md:block'>Browse through our careers to be a part of Raudra Technologies</p>
        </div>
      </div>

      {/* Job openings section */}
      <div className='w-full  py-8 px-1 flex flex-col justify-center items-center'>
        <p className='text-2xl font-semibold py-8'>Job Openings</p>
        {/* Search form */}
        <div className="flex flex-col px-4 md:flex-row justify-center mb-8 bg-zinc-200 py-16 w-full gap-4">
          <input
            type="text"
            placeholder="Title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border shadow-lg border-gray-300 rounded-md"
          />
          <div className='flex items-center gap-2'>
          <input
            type="text"
            placeholder="Location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="p-2 border  shadow-lg border-gray-300 w-1/2 rounded-md"
          />
          <input
            type="text"
            placeholder="Type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="p-2 border  shadow-lg border-gray-300 w-1/2 rounded-md"
          />
          </div>
          <button onClick={filterJobs} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">Search <IoSearch/></button>
          <button onClick={resetFilters} className="bg-gray-500 hover:bg-gray-600 text-white text-gray-800 px-4 py-2 rounded-md">Reset Filters</button>
        </div>
        {/* Job data table */}
        {isLoading ? (
          <CircularProgress />
        ) : isError ? (
          <p>Error fetching data</p>
        ) : filterData.length > 0 ? (
          <DataTable columns={columns} rows={filterData} />
        ) : (
          <p className="text-lg bg-neutral-200 p-4 rounded">No matching positions found.</p>
        )}
        {/* Mobile view */}
        <div className='w-full px-2 sm:flex md:hidden lg:hidden'>
          {filterData.map((job) => (
            <JobCard key={job._id} title={job.title} openings={job.openings} location={job.location} date={job.postedOn} type={job.type} apply={() => handleApply(job._id)} />
          ))}
          
        </div>
      </div>

      {/* Why should you join section */}
      <div className='flex flex-col justify-center items-center px-4 py-16'>
        <h3 className='text-2xl font-bold py-2 text-center'>Why should you join Raudra Technologies ?</h3>
        <div className='bg-blue-500 w-40 h-1'></div>
        <div class="flex flex-col md:flex-row py-16 justify-center gap-8">
          <Service_card src='/innovation.png' heading='Innovation' desc='Work On Technologies Of The Future, Stay Connected To Everything That Is Happening '/>
          <Service_card src='/growth.png' heading='Growth' desc='Our Culture Is Built On The Philosophy Of Mutual Growth And Becoming The Best Version Of Yourself'/>
          <Service_card src='/balance.png' heading='Balance' desc='We Believe In Balance. Working, Learning And Fun Are Equally Important. '/>
        </div>
      </div>
    </div>
  );
}

export default Careers;
