import React, { useState, useEffect } from "react";

import JobListing from "./JobListing";
import { Link } from "react-router-dom";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = "/api/jobs";
      try {
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setJobs(data);
          console.log(data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.log('Error fetching data', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <Link to={`/${job.id}`} key={job.id}>
          <JobListing
            key={job.id}
            title={job.title}
            type={job.type}
            description={job.description}
            company={job.company}
          />
        </Link>
      ))}
    </div>
  );
};

export default JobListings;
