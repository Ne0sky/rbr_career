import React from 'react';
import { useState, useEffect } from 'react';
import DataTable from '../Components/DataTable';
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import JobCard from '../Components/JobCard';
import useGetJobs from '../hooks/useGetJobs';
import CircularProgress from '@mui/material/CircularProgress';
import Service_card from '../Components/Service_card';

const Careers = () => {
  const { data: jobs, isLoading, isError } = useGetJobs();
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState();
  const n = 3;

  useEffect(() => {
    if (jobs) {
      setFilterData(
        jobs.filter((item, index) => {
          return (index >= page * n) && (index < (page + 1) * n);
        })
      );
    }
  }, [page, jobs]);

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

  const handleApply = (_id) => {
    console.log('Applying for job with ID:', _id);
    window.open(`/job/${_id}`, '_blank');
  };

  return (
    <div className='font-main flex flex-col relative w-full h-full items-center overflow-x-hidden mt-20'>
      <div className='bg-gray-200 flex relative w-full h-72 banner text-center overflow-x-hidden'>
        <img src="/career.jpg" className='object-cover h-72 w-full filter brightness-50 saturate-150   z-0' alt="" />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
          <p className='text-2xl md:text-3xl lg:text-4xl w-full font-semibold'>Become part of our team!</p>
          <p className='text-xl hidden md:block'>Browse through our careers to be a part of Raudra Technologies</p>
        </div>
      </div>

      <div className='w-full py-8 px-1 flex flex-col justify-center items-center'>
        <p className='text-2xl font-semibold py-8'>Job Openings</p>
        {isLoading ? (
          <CircularProgress />
        ) : isError ? (
          <p>Error fetching data</p>
        ) : jobs  && jobs.length>0 ?(
          <DataTable columns={columns} rows={jobs} />
        ) : (
          <p className="text-lg bg-neutral-200 p-4 rounded">No open positions available right now.</p>
        )}
        <div className='w-full px-2 sm:flex md:hidden lg:hidden'>
          {filterData && filterData.map((job) => (
            <JobCard key={job._id} title={job.title} openings={job.openings} location={job.location} date={job.postedOn} type={job.type} apply={() => handleApply(job._id)} />
          ))}
          <ReactPaginate
            containerClassName={"pagination"}
            activeClassName={"Pg_active"}
            pageClassName={"page-item"}
            onPageChange={(event) => setPage(event.selected)}
            breakLabel="..."
            pageCount={jobs ? Math.ceil(jobs.length / n) : 0} // Check if jobs is defined before calculating page count
            previousLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                <AiFillLeftCircle />
              </IconContext.Provider>
            }
            nextLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                <AiFillRightCircle />
              </IconContext.Provider>
            }
          />
        </div>
      </div>
      <div className='flex flex-col justify-center items-center py-12'>
      <h3 className='text-2xl font-bold py-8'>Why should you join Raudra Technologies ?</h3>
      <div class="flex flex-col md:flex-row justify-center gap-8">
       
      <Service_card src='/innovation.png' heading='Innovation' desc='Work On Technologies Of The Future, Stay Connected To Everything That Is Happening '/>
      <Service_card src='/growth.png' heading='Growth' desc='Our Culture Is Built On The Philosophy Of Mutual Growth And Becoming The Best Version Of Yourself'/>
      <Service_card src='/balance.png' heading='Balance' desc='We Believe In Balance. Working, Learning And Fun Are Equally Important. '/>
      </div>
      </div>

      

    </div>
  );
}

export default Careers;
