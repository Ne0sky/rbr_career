import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import DataTable from '../Components/DataTable'
import useGetJobApplications from '../hooks/useGetJobApplications';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Job_Applicants = () => {
  const { id } = useParams();
  const { data: jobApplications, isLoading, isError, error } = useGetJobApplications(id);
  const columns = [
    { field: 'applicantName', headerName: 'Name', flex: 1 },
    { field: 'applicantEmail', headerName: 'Email', flex: 1 },
    { 
      field: 'Highest Qualification', 
      headerName: 'Highest Qualification', 
      flex: 1, 
      valueGetter: (params) => {
        const lastQualification = params.row.qualifications[params.row.qualifications.length - 1];
        if (lastQualification) {
          // Extract values from the last qualification object
          const { degree, institute } = lastQualification;
          // Concatenate values into a string
          return `${degree} - ${institute}`;
        } else {
          return ''; 
        }
      },
    },
    {
      field: 'Learn More',
      headerName: '',
      width: 120,
      renderCell: (params) => (
        <button className='bg-lime-500 rounded px-2 py-1' onClick={() => handleLearnMore(params.row.id)}>Learn More</button>
      ),
    },
  ];
  
  const handleLearnMore = (id) => {
    console.log('Applying for job with ID:', id);
    window.open(`/admin/applicant/${id}`, '_blank');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
                <CircularProgress />
            </div>
    )
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='py-12 font-main'>
      <div className='w-full py-8 px-1 flex flex-col justify-center items-center'>
        <p className='text-2xl font-semibold py-8'>List of Applicants</p>
        {jobApplications.length === 0 ? (
          <p>No job applications submitted yet.</p>
        ) : (
          <>
            <div className='w-full px-4 flex flex-col items-center justify-center'>
              <p className='py-4 font-medium text-xl'>Number of Applicants : {jobApplications.length}</p>
              <DataTable columns={columns} rows={jobApplications} />
              <div className='w-full sm:flex md:hidden lg:hidden'>
                {jobApplications.map((applicant) => (
                  <div key={applicant.id} className='shadow-md p-4 rounded my-4 w-full'>
                    <p>Name: {applicant.applicantName}</p>
                    <p>Email: {applicant.applicantEmail}</p>
                    <p>Highest Qualification: {applicant.qualifications[applicant.qualifications.length - 1].degree} - {applicant.qualifications[applicant.qualifications.length - 1].institute}</p>
                    
                    <button onClick={() => handleLearnMore(applicant.id)} className='bg-lime-500 rounded px-2 py-1'>Learn More</button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Job_Applicants;
