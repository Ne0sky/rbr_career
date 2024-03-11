import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useJobs from '../hooks/useGetAllJobs';
import useDeleteJob from '../hooks/useJobDeletion';
import { CircularProgress } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';
import { CiLocationOn } from "react-icons/ci";
import { LuClock } from "react-icons/lu";
import { IoMdCreate } from "react-icons/io";
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css for the default styling

const Dashboard = () => {
    const { data: jobs, isLoading, isError, error, refetch } = useJobs();
    const deleteJob = useDeleteJob();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [searchType, setSearchType] = useState('');
    const [sortedJobs, setSortedJobs] = useState([]);
    const [sortAsc, setSortAsc] = useState(true);
    const [sortLabel, setSortLabel] = useState('Recent First');
    
    useEffect(() => {
        if (jobs) {
            setSortedJobs(jobs);
        }
    }, [jobs]);

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this job?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await deleteJob(id);
                        refetch();
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };

    const handleSortByDate = () => {
        const sorted = [...sortedJobs].sort((a, b) => {
            const dateA = new Date(a.postedOn);
            const dateB = new Date(b.postedOn);
            if (sortAsc) {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });
        setSortedJobs(sorted);
        setSortAsc(!sortAsc);
        setSortLabel(sortAsc ? 'Oldest First' : 'Recent First');
    };

    

    const handleSearch = () => {
        const filteredJobs = jobs.filter(job =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            job.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
            (searchType === '' || job.type === searchType)
        );
        setSortedJobs(filteredJobs);
    };
    const handleReset = () => {
        setSearchTerm('');
        setSearchLocation('');
        setSearchType('');
        setSortedJobs(jobs);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-rose-200 p-2 rounded border border-rose-500">
                Error: {error.message}
            </div>
        );
    }

    return (
        <div className="max-w-4xl min-h-screen font-main px-2 mx-auto py-24">
            <Link className='float-right flex items-center gap-2 bg-amber-500 p-2 rounded text-white font-semibold' to='/admin/create_job'>Create new Job<IoMdCreate/></Link>
            <h2 className="text-3xl font-semibold mb-4">List of all active jobs</h2>
            <h3 className='text-xl font-semibold'>Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 py-4">
                <input
                    type="text"
                    placeholder="job title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="location..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className=" px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className=" px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                    <option value="">All</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Internship">Internship</option>
                </select>
                <button onClick={handleSearch} className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Search</button>
                <button onClick={handleReset} className=" bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md">Reset Filters</button>

            </div>
            <button onClick={handleSortByDate} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-4">
                {sortLabel}
            </button>
            <div className="grid grid-cols-1 gap-4">
                <Suspense fallback={<CircularProgress />}>
                {sortedJobs.map((job) => (
                    <div key={job._id} className="bg-neutral-100 border-l-2 border-blue-500 gap-4 flex items-center justify-between shadow-md p-4">
                        <div className='flex flex-col gap-2'>
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <p className=" rounded-full text-center py-1 px-2 bg-zinc-300"> {job.type}</p>
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
                            <button onClick={() => handleDelete(job._id)} className="rounded-md bg-rose-500 hover:bg-rose-700 text-white flex items-center gap-1 p-1 ">
                                <MdDeleteSweep />Delete
                            </button>
                        </div>
                    </div>
                ))}
                </Suspense>
            </div>
        </div>
    );
};

export default Dashboard;