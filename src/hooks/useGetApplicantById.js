import { useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
const useGetApplicantById = (applicantId) => {
    const cookies = new Cookies();
    const token = cookies.get('token');
  const getApplicantById = async () => {
    const response = await axios.get(`https://rbrcareers-seven.vercel.app/admin/applicant/${applicantId}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const applicantData = response.data.data;

    console.log(applicantData);
    return applicantData;
  };

  return useQuery(['applicant', applicantId], getApplicantById, {
    onError: (error) => {
      console.error('Error fetching applicant:', error);
    }
  });
};

export default useGetApplicantById;
