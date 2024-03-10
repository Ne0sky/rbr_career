import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import DataTable from '../Components/DataTable';
import useGetJobApplications from '../hooks/useGetJobApplications';
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css for the default stylingimport CircularProgress from '@mui/material/CircularProgress';
import useDeleteApplicant from '../hooks/useDeleteApplicant'; // Import the useDeleteApplicant hook
import { CircularProgress } from '@mui/material';
import { MdDelete } from "react-icons/md";

const Job_Applicants = () => {
  const { id } = useParams();
  const { data: jobApplications, isLoading, isError, error, refetch } = useGetJobApplications(id);
  const deleteApplicant = useDeleteApplicant(); // Use the useDeleteApplicant hook

  const handleDelete = (id) => {
    confirmAlert({
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this application?',
        buttons: [
            {
                label: 'Yes',
                onClick: async () => {
                    await deleteApplicant(id);
                    refetch();
                }
            },
            {
                label: 'No',
                onClick: () => {}
            }
        ]
    });
};

  const columns = [
    { field: 'applicantName', headerName: 'Name', flex: 1 },
    { field: 'applicantEmail', headerName: 'Email', flex: 1 },
    { field: 'yearsOfExperience', headerName: 'Year of Experience', flex: 1 },
    { 
      field: 'Highest Qualification', 
      headerName: 'Highest Qualification', 
      flex: 1, 
      valueGetter: (params) => {
        const lastQualification = params.row.qualifications[params.row.qualifications.length - 1];
        if (lastQualification) {
          const { degree, institute } = lastQualification;
          return `${degree} - ${institute}`;
        } else {
          return ''; 
        }
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-4 justify-around items-center">
          <button className='bg-lime-500 text-white rounded px-2 py-1' onClick={() => handleLearnMore(params.row._id)}>Learn More</button>
          <button className='text-rose-500 text-2xl' onClick={() => handleDelete(params.row._id)}><MdDelete/></button>
        </div>
      ),
    },
  ];
  
  const handleLearnMore = (id) => {
    console.log('Learning more about applicant with ID:', id);
    window.open(`/admin/applicant/${id}`, '_blank');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <CircularProgress />
      </div>
    );
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
                  <div key={applicant._id} className='shadow-md p-4 rounded my-4 w-full'>
                    <p>Name: {applicant.applicantName}</p>
                    <p>Email: {applicant.applicantEmail}</p>
                    <p>Highest Qualification: {applicant.qualifications[applicant.qualifications.length - 1].degree} - {applicant.qualifications[applicant.qualifications.length - 1].institute}</p>
                    <p>Years of Experience: {applicant.yearsOfExperience}</p>
                    <button onClick={() => handleLearnMore(applicant.id)} className='bg-lime-500 rounded px-2 py-1'>Learn More</button>
                    <button onClick={() => handleDelete(applicant.id)} className='bg-red-500 rounded px-2 py-1 mx-4'>Delete</button>
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
