import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';
import { CiLocationOn } from "react-icons/ci";
import { LuClock } from "react-icons/lu";

const JobCard2 = ({ job, handleDelete }) => {
  return (
    <div className="bg-neutral-100 border-l-2 border-blue-500 gap-4 flex items-center justify-between shadow-md p-4">
      <div className='flex flex-col gap-2'>
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="rounded-full text-center py-1 px-2 bg-zinc-300">{job.type}</p>
        <p className='flex items-center gap-2'><CiLocationOn className='text-xl'/> {job.location}</p>
        <p className="text-gray-600 flex items-center gap-2"><LuClock/> {new Date(job.postedOn).toLocaleDateString()}</p>
        <div className='flex items-center gap-4'>
          <Link to={`/job/${job._id}`} target='_blank' className='bg-zinc-900 text-white py-1 px-2 w-24 text-center text-sm rounded-md'>See More</Link>
          <Link to={`/admin/job_applicants/${job._id}`} target='_blank' className='bg-blue-500 text-white py-1 px-2 w-36 text-center text-sm rounded-md'>See Applications</Link>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <Link
          to={`/admin/edit_job`}
          className="text-white rounded-md bg-blue-500 hover:bg-blue-700 flex items-center gap-1 px-2 py-1"
          state={{ job }}
        >
          <FaEdit />Edit
        </Link>
        <button onClick={() => handleDelete(job._id)} className="rounded-md bg-rose-500 hover:bg-rose-700 text-white flex items-center gap-1 p-1">
          <MdDeleteSweep />Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard2;
