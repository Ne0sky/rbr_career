import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TiDeleteOutline } from "react-icons/ti";
import useSubmitApplication from '../hooks/useSubmitApplication';
import { FaPaperPlane } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const Application = () => {
    const { id } = useParams();
    const { submitApplication, isLoading, error } = useSubmitApplication();
    const [resume, setResume] = useState('');
    const [jobId, setJobId] = useState(id);
    const [applicantName, setApplicantName] = useState('');
    const [applicantEmail, setApplicantEmail] = useState('');
    const [applicantPhone, setApplicantPhone] = useState('');
    const [experience, setExpericience] = useState('');
    const [degree, setDegree] = useState('');
    const [institute, setInstitute] = useState('');
    const [qualifications, setQualifications] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [semester, setSemester] = useState('');

    const handleAddQualification = () => {
        if (degree !== '' && institute !== '')
            setQualifications([...qualifications, { degree: degree, institute: institute }]);
        setDegree('');
        setInstitute('');
    };


    const handleRemoveQualification = (index) => {
        const newQualifications = [...qualifications];
        newQualifications.splice(index, 1);
        setQualifications(newQualifications);
    };


    const handleDragEnter = (e) => {
        e.preventDefault();
        // Additional styling or actions when file dragged over
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        // Additional styling or actions when file dragged over
    };

    const handleDragLeave = () => {
        // Additional styling or actions when file dragged out
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFileUpload(file);
    };
    const handleFileUpload = (file) => {
        if (file.size <= 1048576) { //1mb
            setResume(file);
        } else {
            setErrorText('File size exceeds 1mb limit');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('resume', resume);
        formData.append('jobId', jobId);
        formData.append('applicantName', applicantName);
        formData.append('applicantEmail', applicantEmail);
        formData.append('applicantPhone', applicantPhone);
        formData.append('yearsOfExperience', experience);
        formData.append('semester', semester);
        qualifications.forEach((qualification, index) => {
            formData.append(`qualifications[${index}][degree]`, qualification.degree);
            formData.append(`qualifications[${index}][institute]`, qualification.institute);
        });

        await submitApplication(formData);
        if (!error) {
            clearForm();
        }

    };
    const clearForm = () => {
        setResume('');
        setApplicantName('');
        setApplicantEmail('');
        setApplicantPhone('');
        setQualifications([]);
        setDegree('');
        setInstitute('');
        setExpericience('');
    };

    const input_style = "rounded  w-full"
    return (
        <div className='mx-auto w-full mt-20 flex flex-col font-main items-center justify-center py-12'>
            <h1 className='text-xl md:text-2xl lg:text-3xl font-bold pb-8'>Job Application Form</h1>
            <form className="max-w-md  px-4" >
                <div className="mb-4">
                </div>
                <label className="block mb-2 text-xl font-semibold" htmlFor="resume">Personal Details</label>

                <div className="mb-4">
                    <TextField className={input_style} type="text" required label='Full Name' id="applicantName" value={applicantName} onChange={(e) => setApplicantName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <TextField className={input_style} label='Email Address' required type="email" id="applicantEmail" value={applicantEmail} onChange={(e) => setApplicantEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <TextField className={input_style} type="tel" required id="applicantPhone" label='Phone Number' value={applicantPhone} onChange={(e) => setApplicantPhone(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <TextField className={input_style} type="number" required id="experience" label='Years of Experience' value={experience} onChange={(e) => setExpericience(e.target.value)} />
                </div>
                <label className="block text-xl font-semibold">Qualifications</label>
                <div className=" flex w-full flex-wrap gap-2">

                    {qualifications.map((qualification, index) => (
                        <div key={index} className=" px-2 py-1 bg-gray-200 rounded flex items-center justify-between mb-2">
                            <div className='text-xs flex items-center justify-center gap-2'>
                                <p>{qualification.degree}</p>
                                <p>{qualification.institute}</p>
                            </div>
                            <button onClick={() => handleRemoveQualification(index)}><TiDeleteOutline style={{ fontSize: '16px' }} /></button>
                        </div>
                    ))}
                </div>
                <div className='flex gap-4 flex-col items-end'>
                    <div className='flex gap-4 py-4'>
                        <div >
                            <TextField label='Degree' className={input_style} type="text" id="degree" value={degree} onChange={(e) => setDegree(e.target.value)} />
                        </div>
                        <div >
                            <TextField label='College' className={input_style} type="text" id="institute" value={institute} onChange={(e) => setInstitute(e.target.value)} />
                        </div>
                    </div>
                    <div className='flex items-start justify-start gap-1'><button className="mb-4  bg-gray-300 p-2 rounded text-sm" type='button' onClick={handleAddQualification}>Submit Qualification</button><span className='text-2xl text-red-500'>*</span></div>
                </div>
                <div className="mb-4">
                    <TextField className={input_style} type="text" id="semester" label='Semester' value={semester} onChange={(e) => setSemester(e.target.value)} />
                </div>
                <label className="block mb-2 text-xl font-semibold" htmlFor="resume">Resume</label>
                <div className="flex items-center justify-center w-full" onDrop={(e) => handleDrop(e)} onDragOver={(e) => handleDragOver(e)} onDragEnter={(e) => handleDragEnter(e)} onDragLeave={(e) => handleDragLeave(e)}>
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PDF, doc, docx (MAX. 1mb)</p>
                        </div>
                        <input id="dropzone-file" type="file" accept=".pdf,.doc,.docx" className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file.size <= 1048576) { //1mb
                                    setResume(file);
                                } else {
                                    setErrorText('File size exceeds 1mb limit');
                                }
                            }}
                        />
                    </label>
                </div>

                {errorText && <p className="text-red-500 text-sm">{errorText}</p>}
                {resume && <span className="p-1 block my-2 w-auto text-center rounded bg-lime-200 text-sm">File uploaded successfully</span>}
                <button className="bg-blue-500  hover:bg-blue-700 text-white my-8 flex gap-2 py-2 px-4 rounded items-center" disabled={isLoading} onClick={handleSubmit}>Submit Application {isLoading ? <CircularProgress size={20} /> : <FaPaperPlane />}</button>
            </form>
        </div>
    );
};

export default Application;
