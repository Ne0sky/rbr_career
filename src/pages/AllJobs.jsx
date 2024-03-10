import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const cookies = new Cookies();
                const token = cookies.get('token');
                const response = await axios.get('https://rbrcareers.vercel.app/admin/jobs', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response);
                setJobs(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching jobs:', error);
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleDelete = async (id) => {
        try {
            const cookies = new Cookies();
            const token = cookies.get('token');
            await axios.delete(`https://rbrcareers.vercel.app/admin/job/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setJobs(jobs.filter(job => job._id !== id));
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">All Jobs</h2>
            <div className="grid grid-cols-1 gap-4">
                {jobs.map(job => (
                    <div key={job._id} className="bg-white shadow-md rounded-md p-4">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-gray-600">{job.description.responsibilities}</p>
                        <p className="text-gray-600">{job.description.requirements}</p>
                        <p className="text-gray-600">Salary: {job.description.salary}</p>
                        <p className="text-gray-600">Location: {job.location}</p>
                        <p className="text-gray-600">Type: {job.type}</p>
                        <p className="text-gray-600">Posted On: {new Date(job.postedOn).toLocaleDateString()}</p>
                        <div className="flex mt-4">
                            <Link to={`/admin/edit_job`} state={{ job }} className="mr-4 text-blue-600">Edit</Link>
                            <button onClick={() => handleDelete(job._id)} className="text-red-600">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllJobs;
