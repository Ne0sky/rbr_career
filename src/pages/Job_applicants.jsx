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
    // window.open(`/job/${id}`, '_blank');
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='py-12'>
      {/* <ul>
        {jobApplications.map(applicant => (
          <li key={applicant._id}>
            <p>Email: {applicant.applicantName}</p>
            <p>Name: {applicant.applicantEmail}</p>
            <p>Phone:{applicant.applicantPhone}</p>
            {applicant.qualifications.map((qualification, index) => (
              <div key={index}>
                <p>Degree: {qualification.degree}</p>
                <p>Institute: {qualification.institute}</p>
              </div>
            ))}
            <Link to={applicant.resumeUrl}>Download Resume</Link> 
          </li>
        ))}
      </ul> */}
      <div className='w-full py-8  px-1 flex flex-col justify-center items-center'>
                <p className='text-2xl font-semibold py-8'>List of Applicants</p>
                {isLoading ? (
                    <CircularProgress/>
                ) : isError ? (
                    <p>Error fetching data</p>
                ) : (
                    <DataTable  columns={columns} rows={jobApplications} />
                )}
                {/* <div className=' w-full sm:flex md:hidden lg:hidden'>
                    {jobs && jobs.map((job) => (
                        <JobCard key={job.id} title={job.title} location={job.location} date={job.date} type={job.type} apply={() => handleApply(job.id)} />
                    ))}
                </div> */}
            </div>
    </div>
  );
};

export default Job_Applicants;
