import React, { useEffect, useState } from "react";
import { Link, Route, useParams } from "react-router-dom";

const JobPage = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                console.log(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();

    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!job) return <p>No job found</p>;

    return (
        <div className="job-page">
            <h2>{job.title}</h2>
            <div>Type: {job.type}</div>
            <div>Description: {job.description}</div>
            <div>Company: {job.company.name}</div>
            <div>Contact email: {job.company.contactEmail}</div>
            <div>Contact phone: {job.company.contactPhone}</div>
            <Link to={`/edit/${job.id}`}>
                <button>
                    Edit
                </button>
            </Link>
        </div>
    );
};

export default JobPage;