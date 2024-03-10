
import { useQuery } from 'react-query';
import axios from 'axios';

const useGetJobs = () => {
  const getJobs = async () => {
    const response = await axios.get('https://rbrcareers.vercel.app/jobs/allJobs');
    const jobsData = response.data.data;

    // Add id property to each job object
    const jobsWithId = jobsData.map((job, index) => ({
      id: job._id,
      ...job,
    }));
    console.log(jobsWithId);
    return jobsWithId;
  };

  return useQuery('jobs', getJobs, {
    onError: (error) => {
      console.error('Error fetching jobs:', error);
    }
  });
};

export default useGetJobs;
