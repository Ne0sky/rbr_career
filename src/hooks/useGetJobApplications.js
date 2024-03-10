import { useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
const useGetJobApplications = (jobId) => {
    const cookies = new Cookies();
    const token = cookies.get('token');
  const getJobApplications = async () => {
    const response = await axios.get(`https://rbrcareers.vercel.app/admin/job/${jobId}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
        
    });
    const jobApplications = response.data.data;
    
    return jobApplications;
  };

  return useQuery(['jobApplications', jobId], getJobApplications, {
    onError: (error) => {
      console.error('Error fetching job applications:', error);
    }
  });
};

export default useGetJobApplications;
