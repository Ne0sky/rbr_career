import { useQuery } from 'react-query';
import axios from 'axios';

const useGetJobById = (jobId) => {
  const getJobById = async () => {
    const response = await axios.get(`https://rbrcareers.vercel.app/jobs/${jobId}`);
    const jobData = response.data.data;

    console.log(jobData);
    return jobData;
  };

  return useQuery(['job', jobId], getJobById, {
    onError: (error) => {
      console.error('Error fetching job:', error);
    }
  });
};

export default useGetJobById;
