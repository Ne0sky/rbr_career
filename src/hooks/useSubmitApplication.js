import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const useSubmitApplication = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitApplication = async (formData) => {
        setIsLoading(true);
        setError(null);
        try {
            await axios.post('http://rbrcareers.vercel.app/jobs/apply', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Application submitted successfully!');
            toast.success('Application submitted successfully!');
        } catch (error) {
            console.error('Error submitting application:', error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { submitApplication, isLoading, error };
};

export default useSubmitApplication;
