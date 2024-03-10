import React, { useState } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie"

const CreateJobForm = () => {
    const [title, setTitle] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [requirements, setRequirements] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [openings, setOpenings] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cookies = new Cookies();
        const token = cookies.get('token');

        // Create an object to store the form data
        const formData = {
            title,
            description: { responsibilities, requirements, salary },
            location,
            openings,
            type
        };

        // Log the form data before sending the request
        console.log('Form Data:', formData);

        try {
            const response = await axios.post('https://rbrcareers.vercel.app/admin/job', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Job created:', response.data);
            // Reset form fields after successful submission
            setTitle('');
            setResponsibilities('');
            setRequirements('');
            setSalary('');
            setLocation('');
            setType('');
            setOpenings(0);
        } catch (error) {
            console.error('Error creating job:', error);
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
                    <label htmlFor="openings" className="block">Openings:</label>
                    <input type="number" id="openings" value={openings} onChange={(e) => setOpenings(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="type" className="block">Type:</label>
                    <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Create Job</button>
            </form>
        </div>
    );
};

export default CreateJobForm;
