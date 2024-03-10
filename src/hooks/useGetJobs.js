import { useCallback } from 'react';
import { useQuery} from 'react-query';
import axios from 'axios';

const useGetJobs = () => {
  const getJobs = useCallback(async () => {
    const response = await axios.get('https://rbrcareers.vercel.app/jobs/allJobs');
    const jobsData = response.data.data;

    return jobsData;
  }, []);

  return useQuery('jobs', getJobs, {
    onError: (error) => {
      console.error('Error fetching jobs:', error);
    }
  });
};

export default useGetJobs;

