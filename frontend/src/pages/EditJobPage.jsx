import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
    const [job, setJob] = useState({});
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`/api/jobs/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch job");
                }
                const data = await res.json();
                setJob(data);
                setTitle(data.title);
                setType(data.type);
                setDescription(data.description);
                setCompanyName(data.company.name);
                setContactEmail(data.company.contactEmail);
                setContactPhone(data.company.contactPhone);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const submitForm = (e) => {
        e.preventDefault();
        console.log("submitForm called");
    
        const editedJob = {
          title: title,
          type: type,
          description: description,
          company: {
            name: companyName,
            contactEmail: contactEmail,
            contactPhone: contactPhone,
          },
        };
    
        editJob(editedJob);
        navigate(`/${id}`);
    
      };
    
      const editJob = async (editedJob) => {
        console.log("addJob called");
    
        try {
          const res = await fetch(`/api/jobs/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              //'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(editedJob),
          });
          if (!res.ok) {
            throw new Error("Failed to edit job");
          }
        } catch (error) {
          console.error(error);
          return false;
        }
        return true;
      }

    return (
        <div className="create">
            <h2>Edit Job</h2>
            <form onSubmit={submitForm}>
                <label>Job title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Job type:</label>
                <select
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                </select>

                <label>Job Description:</label>
                <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}

                ></textarea>
                <label>Company Name:</label>
                <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <label>Contact Email:</label>
                <input
                    type="text"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                />
                <label>Contact Phone:</label>
                <input
                    type="text"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                />
                <button>Edit Job</button>
            </form>
        </div>
    )
}

export default EditJobPage;