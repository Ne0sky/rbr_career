import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useLocation } from 'react-router-dom'

const EditJobForm = (props) => {
    const locationo = useLocation()
    const { job } = locationo.state
    console.log(job);
    const [title, setTitle] = useState(job.title || ''); 
    const [responsibilities, setResponsibilities] = useState(job.description?.responsibilities || ''); 
    const [requirements, setRequirements] = useState(job.description?.requirements || ''); 
    const [salary, setSalary] = useState(job.description?.salary || ''); 
    const [location, setLocation] = useState(job.location || ''); 
    const [type, setType] = useState(job.type || ''); 
    console.log(job);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const cookies = new Cookies();
        const token = cookies.get('token');

        // Create an object to store the updated job data
        const updatedJobData = {
            title,
            description: { responsibilities, requirements, salary },
            location,
            type
        };

        try {
            const response = await axios.patch(`https://rbrcareers.vercel.app/admin/job/${job._id}`, updatedJobData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Job updated:', response.data);
            // Reset form fields after successful submission
            setTitle('');
            setResponsibilities('');
            setRequirements('');
            setSalary('');
            setLocation('');
            setType('');
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block">Title:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="responsibilities" className="block">Responsibilities:</label>
                    <textarea id="responsibilities" value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)} required className="w-full border border-gray-300 rounded px-3 py-2"></textarea>
                </div>
                <div>
                    <label htmlFor="requirements" className="block">Requirements:</label>
                    <textarea id="requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} required className="w-full border border-gray-300 rounded px-3 py-2"></textarea>
                </div>
                <div>
                    <label htmlFor="salary" className="block">Salary:</label>
                    <input type="number" id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="location" className="block">Location:</label>
                    <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="type" className="block">Type:</label>
                    <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update Job</button>
            </form>
        </div>
    );
};

export default EditJobForm;
